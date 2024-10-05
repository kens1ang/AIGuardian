"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useWallet } from "../WalletContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { Contract } from "ethers";
import { tweeterpostAddress, tweeterpostABI } from "../contractsABI/tweeterpost";
import { deepfakestorageAddress, deepfakestorageABI } from "../contractsABI/deepfakestorage";
import { originalityAddress, originalityABI } from "../contractsABI/originality";
import { uploadImageToIPFS } from "../ipfsUploader";
import "react-toastify/dist/ReactToastify.css";
import LeftSidebar from "../demo-components/left-sidebar";
import RightSidebar from "../demo-components/right-sidebar";
import {
  ImageIcon,
  GifIcon,
  ChartIcon,
  CalendarIcon,
  PinIcon,
  MarkXIcon,
  SparklesIcon,
  DeepFakeIcon,
  VerifiedIcon,
  WarningIcon,
  ReportIcon,
  LoveIcon,
  ShareIcon,
  CommentIcon,
} from "../demo-components/ui/heroicon";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/landing-components/ui/popover";
import { Badge } from "@/app/landing-components/ui/badge";

interface Tweet {
  postId: string;
  userAddress: string;
  ipfsHash: string;
  content: string;
  imageHash: string;
  deepfakeValue: number;
  originality: boolean;
  timestamp: string;
  worldid: string;
}

interface ImageOption {
  name: string;
  path: string;
}

export default function Home() {
  const { address, signer, connectWallet } = useWallet();
  const [isFetching, setIsFetching] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [newTweet, setNewTweet] = useState<string>("");
  const [deepfakeValue, setDeepfakeValue] = useState<number>(1);
  const [notOriginal, setNotOriginal] = useState<boolean>(false);
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [reportLoading, setReportLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [reportImageFile, setReportImageFile] = useState<File | null>(null);
  const [reportImagePreview, setReportImagePreview] = useState<string | null>(
    null
  );
  const [postImageHash, setPostImageHash] = useState<string>("");

  const imageOptions = [
    { name: "realImage1.jpg", path: "/assets/images/real1.jpeg" },
    { name: "fakeImage1.jpg", path: "/assets/images/real1.jpeg" },
    { name: "realImage2.jpg", path: "/assets/images/real2.jpg" },
    { name: "fakeImage2.jpg", path: "/assets/images/real2.jpg" },
  ];

  const fetchPosts = async () => {
    try {
      if (!signer) {
        toast.error("Please connect your wallet.");
        return;
      }

      const postContract = new Contract(
        tweeterpostAddress,
        tweeterpostABI,
        signer
      );
      const deepfakeContract = new Contract(
        deepfakestorageAddress,
        deepfakestorageABI,
        signer
      );
      const originalityContract = new Contract(
        originalityAddress,
        originalityABI,
        signer
      );

      const posts = await postContract.getPostsDescending();

      const formattedPosts = await Promise.all(
        posts.map(async (post: any) => {
          const deepfakeValue = await deepfakeContract.getDeepfakeValue(
            post.imageHash
          );
          const originality = await originalityContract.getOriginality(
            post.imageHash
          );

          return {
            postId: post.postId.toString(),
            ipfsHash: post.ipfsHash,
            content: post.content,
            imageHash: post.imageHash,
            worldid: post.worldId,
            deepfakeValue: Number(deepfakeValue),
            originality: originality,
            timestamp: new Date(Number(post.timestamp) * 1000).toLocaleString(),
          };
        })
      );

      setTweets(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts from the blockchain.");
    }
  };

  useEffect(() => {
    // Check if walletAddress and worldId exist in sessionStorage
    const storedWalletAddress = sessionStorage.getItem("walletAddress");
    const storedWorldId = sessionStorage.getItem("worldId");

    // If walletAddress and worldId exist, trigger wallet connection and auto-fetch posts
    if (storedWalletAddress && storedWorldId) {
      (async () => {
        await connectWallet(); // Ensure wallet is connected before fetching
        if (signer) {
          setIsFetching(true); // Set fetching state to true
          await fetchPosts();
          setIsFetching(false); // Set fetching state to false after fetching
        }
      })();
    }
  }, [signer]);

  const handleTweetChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet(e.target.value);
  };

  const handleImageSelection = async (image: ImageOption) => {
    try {
      const response = await fetch(image.path);
      const blob = await response.blob();

      const fetchedFile = new File([blob], image.name, { type: blob.type });

      setImageFile(fetchedFile);
      setImagePreview(URL.createObjectURL(fetchedFile));

      console.log("Fetched and set image file from path:", fetchedFile);
    } catch (error) {
      console.error("Error fetching image file:", error);
      toast.error("Failed to fetch image.");
    }
  };

  const handleReportImageSelection = async (image: ImageOption) => {
    try {
      const response = await fetch(image.path);
      const blob = await response.blob();

      const fetchedFile = new File([blob], image.name, { type: blob.type });
      console.log(fetchedFile);
      setReportImageFile(fetchedFile);
      setReportImagePreview(URL.createObjectURL(fetchedFile));
      console.log("Fetched and set report image file from path:", fetchedFile);
    } catch (error) {
      console.error("Error fetching report image file:", error);
      toast.error("Failed to fetch report image.");
    }
  };

  const handleCloseReportDialog = () => {
    setReportImageFile(null);
    setReportImagePreview(null);
  };

  const generateHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Log generated hash
    console.log("Generated Image Hash:", hashHex);
    return hashHex;
  };

  const checkIfImageVerified = async (imageHash: string): Promise<boolean> => {
    try {
      const deepfakeContract = new Contract(
        deepfakestorageAddress,
        deepfakestorageABI,
        signer
      );
      const deepfakeValue = await deepfakeContract.getDeepfakeValue(imageHash);
      const verified = Number(deepfakeValue) !== 0;

      // Log verification status
      console.log("Image Verified:", verified);
      return verified;
    } catch (error) {
      console.error("Error checking image verification:", error);
      return false;
    }
  };

  const storeDeepfakeVerification = async (
    imageHash: string,
    deepfakeValue: number
  ) => {
    try {
      if (!signer) {
        toast.error("Please connect your wallet first.");
        return;
      }
      const deepfakeContract = new Contract(
        deepfakestorageAddress,
        deepfakestorageABI,
        signer
      );
      const transaction = await deepfakeContract.storeImage(
        imageHash,
        deepfakeValue
      ); // Assuming the contract method has changed to `storeImage`
      await transaction.wait();

      console.log("Deepfake verification stored:", {
        imageHash,
        deepfakeValue,
      });
      toast.success(
        "Deepfake verification for the image stored on the blockchain successfully!"
      );
    } catch (error) {
      console.error("Error storing deepfake verification:", error);
      toast.error("Failed to store deepfake verification for the image.");
    }
  };

  const storePostOnBlockchain = async (
    ipfsHash: string,
    imageHash: string,
    content: string
  ) => {
    try {
      if (!signer) {
        toast.error("Please connect your wallet first.");
        return;
      }

      const storedWorldId = sessionStorage.getItem("worldId");

      if (!storedWorldId) {
        toast.error("World ID not found. Please sign in with World ID first.");
        return;
      }
      const postContract = new Contract(
        tweeterpostAddress,
        tweeterpostABI,
        signer
      );
      const transaction = await postContract.createPost(
        ipfsHash,
        imageHash,
        content,
        storedWorldId
      ); // Include worldId here
      await transaction.wait();

      console.log("Post created on blockchain:", {
        ipfsHash,
        imageHash,
        content,
        storedWorldId,
      });
      toast.success("Post created successfully on the blockchain!");
    } catch (error) {
      console.error("Error creating post on the blockchain:", error);
      toast.error("Failed to create post on the blockchain.");
    }
  };

  const getImageTimeStamp = async (
    imageHash: string
  ): Promise<number | null> => {
    try {
      if (!signer) {
        toast.error("Please connect your wallet first.");
        return null;
      }

      const deepfakeContract = new Contract(
        deepfakestorageAddress,
        deepfakestorageABI,
        signer
      );
      const retrievedTimestamp = await deepfakeContract.getImageTimeStamp(
        imageHash
      );
      const timestamp = Number(retrievedTimestamp);
      console.log("Retrieved Image Timestamp:", timestamp);
      return timestamp;
    } catch (error) {
      console.error("Error retrieving image timestamp:", error);
      return null;
    }
  };

  const handleReportSubmit = async (tweet: { imageHash: string }) => {
    try {
      setReportLoading(true);
      let imageHash = "";

      if (reportImageFile) {
        imageHash = await generateHash(reportImageFile);
        handleCloseReportDialog();
      } else {
        toast.error("Please select or upload an image.");
        setReportLoading(false);
        return;
      }

      const postImageTimestamp = await getImageTimeStamp(tweet.imageHash);
      const originalImageTimestamp = await getImageTimeStamp(imageHash);
      const currentSimilarity = 99;
      console.log(
        "Current Similarity:",
        currentSimilarity,
        postImageTimestamp,
        originalImageTimestamp
      );

      if (postImageTimestamp && originalImageTimestamp) {
        if (
          originalImageTimestamp <= postImageTimestamp &&
          currentSimilarity > 96
        ) {
          await storeOriginalityOnBlockchain(tweet.imageHash, true);
          setNotOriginal(true);
          toast.success("The reported image is flagged as not original.");
          await fetchPosts();
        } else {
          setNotOriginal(false);
          toast.warning(
            "Report failed! The reported image is flagged as original."
          );
          handleCloseReportDialog();
        }
      } else {
        toast.error("Failed to retrieve image timestamps.");
      }
    } catch (error) {
      toast.error("Failed to generate image hash or retrieve timestamps.");
      console.error(error);
    } finally {
      setReportLoading(false);
    }
  };

  const storeOriginalityOnBlockchain = async (
    imageHash: string,
    originality: boolean
  ) => {
    try {
      if (!signer) {
        toast.error("Please connect your wallet first.");
        return;
      }

      const originalityContract = new Contract(
        originalityAddress,
        originalityABI,
        signer
      );
      const transaction = await originalityContract.storeOriginality(
        imageHash,
        originality
      );
      await transaction.wait();

      console.log("Originality status stored on blockchain:", {
        imageHash,
        originality,
      });
      toast.success(
        "Originality status stored on the blockchain successfully!"
      );
    } catch (error) {
      console.error("Error storing originality on the blockchain:", error);
      toast.error("Failed to store originality on the blockchain.");
    }
  };

  const handleTweetSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setPostLoading(true);

    const currentdeepfakevalue = 1;

    if (!currentdeepfakevalue) {
      toast.error("Please select an option for the image type.");
      return;
    }

    let ipfsHash = "";
    let imageHash = "";
    if (imageFile) {
      try {
        imageHash = await generateHash(imageFile);
        const ipfsBlob = new Blob([imageFile]);
        ipfsHash = await uploadImageToIPFS(ipfsBlob);

        // Log IPFS hash and image hash
        console.log("IPFS Hash:", ipfsHash);
        console.log("Image Hash:", imageHash);

        const isVerified = await checkIfImageVerified(imageHash);
        console.log("Is Image Verified:", isVerified);

        if (!isVerified) {
          await storeDeepfakeVerification(imageHash, currentdeepfakevalue);
        } else {
          toast.info("Image has already been verified, skipping verification.");
        }
      } catch (error) {
        toast.error("Failed to fetch, hash, or upload the image.");
        console.error("Error:", error);
        setPostLoading(false);
        return;
      }
    }

    try {
      await storePostOnBlockchain(ipfsHash, imageHash, newTweet);
      await fetchPosts();
      resetForm();
    } catch (error) {
      toast.error("Failed to process tweet.");
      console.error("Error:", error);
    } finally {
      setPostLoading(false);
    }
  };

  const resetForm = () => {
    setImageFile(null);
    setImagePreview(null);
    setNewTweet("");
    setDeepfakeValue(1);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-nowrap">
      <LeftSidebar />

      <div className="flex-grow">
        <div className="bg-black p-4 pt-0 border-y-2 border-gray-700 w-full">
          <div className="flex justify-between mt-4 mb-4">
            <h2 className="text-white font-bold text-2xl">Home</h2>
            <SparklesIcon className="h-8 w-8" />
          </div>
          <form className="w-full" onSubmit={handleTweetSubmit}>
            <div className="flex items-start space-x-4 w-full">
              <div className="relative mt-4 flex justify-center items-center">
                <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300">
                  <img
                    src="/assets/twitter-clone-logo.avif"
                    alt="Profile"
                    className="w-full h-full rounded-full bg-black p-1"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <textarea
                  value={newTweet}
                  onChange={handleTweetChange}
                  rows={1}
                  placeholder="What is happening?!"
                  className="w-full p-4 mt-3 text-xl bg-inherit align-middle text-white bg-whiterounded-lg resize-none focus:outline-none"
                />
                {imagePreview && (
                  <div className="relative mt-4 w-full rounded-lg">
                    <img
                      src={imagePreview}
                      alt="Selected Image"
                      className="w-full h-auto rounded-t-lg"
                    />
                    <button
                      type="button"
                      onClick={resetForm}
                      className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 bg-opacity-75 text-white rounded-full p-1 hover:bg-gray-600 hover:bg-opacity-80"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <MarkXIcon className="h-6 w-6" />
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center mt-2">
                  <div className="flex text-blue-500">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="hover:bg-blue-200 hover:bg-opacity-20 h-10 w-10 p-2 rounded-full"
                        >
                          <ImageIcon className="h-6 w-6" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className=" w-full p-4 bg-[rgb(31,31,31)] flex flex-col rounded-lg border-none"
                      >
                        <h2 className="text-xs text-gray-300 mb-4">
                          Select an Image
                        </h2>
                        <div className="flex justify-between items-center gap-4">
                          {imageOptions.map((image, index) => (
                            <div
                              key={index}
                              className="cursor-pointer"
                              onClick={() => handleImageSelection(image)}
                            >
                              <img
                                src={image.path}
                                alt={image.name}
                                className="w-20 h-20 rounded-lg hover:scale-105 transition-all"
                              />
                              <p className="text-white text-xs text-center mt-2">
                                {image.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    <button
                      type="button"
                      className="hover:bg-blue-200 hover:bg-opacity-20 h-10 w-10 p-2 rounded-full"
                    >
                      <GifIcon className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      className="hover:bg-blue-200 hover:bg-opacity-20 h-10 w-10 p-2 rounded-full"
                    >
                      <ChartIcon className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      className="hover:bg-blue-200 hover:bg-opacity-20 h-10 w-10 p-2 rounded-full"
                    >
                      <CalendarIcon className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      className="hover:bg-blue-200 hover:bg-opacity-20 h-10 w-10 p-2 rounded-full"
                    >
                      <PinIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={postLoading}
                    className={`relative font-bold py-2 px-4 rounded-full w-20 overflow-hidden ${
                      postLoading
                        ? "bg-white cursor-not-allowed" // No hover when loading
                        : "bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 group-hover:bg-white group"
                    }`}
                  >
                    {postLoading ? (
                      <span className="relative z-10 flex justify-center items-center">
                        <img
                          src="/assets/loading.gif"
                          alt="Loading..."
                          className="h-6 w-6"
                        />
                      </span>
                    ) : (
                      <span className="relative z-10 text-white transition-colors duration-500 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-pink-300 group-hover:to-orange-300 group-hover:text-transparent group-hover:bg-clip-text">
                        Post
                      </span>
                    )}

                    <span className="absolute inset-0 bg-white transition-transform duration-500 transform -translate-x-full group-hover:translate-x-0 z-0"></span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div>
          {tweets.length === 0 ? (
            <p className="text-center text-gray-400">No posts yet.</p>
          ) : (
            tweets.map((tweet, index) => (
              <div
                key={index}
                className="bg-black border-b-2 border-gray-700 shadow-md w-full"
              >
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300">
                    <img
                      src="/assets/twitter-clone-logo.avif"
                      alt="Profile"
                      className="w-full h-full rounded-full bg-black p-1"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-bold text-white">AI Guardian</p>
                    <p className="text-sm text-gray-500">
                      @
                      {(tweet.worldid || tweet.userAddress)?.slice(0, 6) +
                        "..." +
                        (tweet.worldid || tweet.userAddress)?.slice(-4)}
                    </p>
                  </div>
                </div>

                <div className="px-4">
                  <p className="text-white mb-2">{tweet.content}</p>
                  <div className="text-gray-800">
                    {tweet.originality === true ? (
                      <div className="relative flex items-center justify-center h-96 bg-red-100 rounded-lg p-4">
                        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center">
                          <FontAwesomeIcon
                            icon={faBan}
                            className="text-red-600 text-4xl mr-2 mb-4"
                          />
                          <span className="text-xl font-bold text-black text-opacity-60">
                            This image is demonetized due to unoriginality.
                          </span>
                        </div>
                        {/* Blurred Image */}
                        {tweet.ipfsHash && (
                          <img
                            src={`${tweet.ipfsHash}`}
                            alt="Demonetized Image"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg filter blur-md opacity-50 z-0"
                          />
                        )}
                      </div>
                    ) : (
                      <>
                        {tweet.ipfsHash && (
                          <div className="my-4">
                            <img
                              src={`${tweet.ipfsHash}`}
                              alt="Posted Image"
                              className="w-full rounded-lg h-auto"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="px-4 py-2 text-white">
                  {tweet.deepfakeValue === 1 && (
                    <div className="max-w-48 p-1 text-xs flex items-center space-x-1">
                      <Badge>
                        <div className="flex gap-2 items-center">
                          <span>Deep Fake Image</span>
                          <DeepFakeIcon className="w-8 h-8" />
                        </div>
                      </Badge>
                    </div>
                  )}
                  {tweet.deepfakeValue === 2 && (
                    <div className="max-w-48 p-1 text-xs flex items-center space-x-1">
                      <Badge>
                        <div className="flex gap-2 items-center">
                          <span>Authentic Image</span>
                          <VerifiedIcon className="w-8 h-8" />
                        </div>
                      </Badge>
                    </div>
                  )}
                  {tweet.deepfakeValue === 3 && (
                    <div className="max-w-48 p-1 text-xs flex items-center space-x-1">
                      <Badge>
                        <div className="flex gap-2 items-center">
                          <span>Not Verified</span>
                          <WarningIcon className="w-8 h-8" />
                        </div>
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between w-full px-16 py-0 border-t-2 border-gray-700">
                  <div className="flex justify-between w-full space-x-8">
                    <button className="text-gray-600 hover:text-red-600 text-xl p-2">
                      <LoveIcon className="h-6 w-6" />
                    </button>
                    <button className="text-gray-600 hover:text-blue-600 text-xl p-2">
                      <CommentIcon className="h-6 w-6" />
                    </button>
                    <button className="text-gray-600 hover:text-green-600 text-xl p-2">
                      <ShareIcon className="h-6 w-6" />
                    </button>

                    <Popover
                      onOpenChange={(open) => {
                        if (!open) {
                          handleCloseReportDialog();
                        }
                      }}
                    >
                      <PopoverTrigger asChild>
                        <button
                          className={`text-gray-600 text-xl p-2 ${
                            tweet.originality === false
                              ? "hover:text-yellow-600 cursor-pointer"
                              : "cursor-not-allowed opacity-50"
                          }`}
                          onClick={() => setPostImageHash(tweet.imageHash)}
                          disabled={tweet.originality === true}
                        >
                          <ReportIcon className="h-6 w-6" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-full p-4 bg-[rgb(31,31,31)] flex flex-col rounded-lg border-none transform -translate-x-10" // Shift to the left
                      >
                        <h2 className="text-xs text-gray-300 mb-4">
                          Upload the original image
                        </h2>

                        {/* Image Selection Grid */}
                        <div className="grid grid-cols-4 gap-6">
                          {imageOptions.map((image, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center cursor-pointer"
                              onClick={() => handleReportImageSelection(image)}
                            >
                              <img
                                src={image.path}
                                alt={image.name}
                                className="w-24 h-24 mb-2 transition-all duration-150 ease-in-out hover:scale-105"
                              />
                              <span className="text-white text-sm">
                                {image.name}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Image Preview Section */}
                        {reportImagePreview && (
                          <div className="mt-4 w-full rounded-lg relative flex justify-center">
                            <div className="relative">
                              <img
                                src={reportImagePreview}
                                alt="Selected Image"
                                className="w-48 h-48"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setReportImageFile(null);
                                  setReportImagePreview(null);
                                }}
                                className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-1 hover:bg-gray-600"
                                style={{ width: "28px", height: "28px" }}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Submit Report Button */}
                        <div className="flex justify-end space-x-2 mt-4">
                          <button
                            type="submit"
                            disabled={reportLoading}
                            onClick={(e) => {
                              e.preventDefault();
                              handleReportSubmit({ imageHash: postImageHash });
                            }}
                            className={`relative font-bold text-center py-2 px-4 rounded-full overflow-hidden flex items-center justify-center ${
                              reportLoading
                                ? "bg-white cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 group-hover:bg-white group"
                            }`}
                          >
                            {reportLoading ? (
                              <span className="relative z-10 flex justify-center items-center">
                                <img
                                  src="/assets/loading.gif"
                                  alt="Loading..."
                                  className="h-6 w-6"
                                />
                              </span>
                            ) : (
                              <span className="relative z-10 text-white transition-colors duration-500 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-pink-300 group-hover:to-orange-300 group-hover:text-transparent group-hover:bg-clip-text">
                                Submit Report
                              </span>
                            )}
                            <span className="absolute inset-0 bg-white transition-transform duration-500 transform -translate-x-full group-hover:translate-x-0 z-0"></span>
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <ToastContainer />
      </div>

      <RightSidebar />
    </div>
  );
}
