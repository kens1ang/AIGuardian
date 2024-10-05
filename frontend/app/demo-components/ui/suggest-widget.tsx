export function SuggestWidget(): JSX.Element {
  return (
    <div className="rounded-2xl bg-[rgb(32,35,39)] p-4 flex flex-col">
      <h2 className="text-lg font-bold text-gray-300">Who to follow</h2>
      <div className="flex flex-row items-center mt-6">
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
              @0x2c50...6489
            </p>
        </div>
      </div>
      <div className="flex justify-center text-center text-blue-400 mt-4">
          Show more
      </div>
    </div>
  );
}
