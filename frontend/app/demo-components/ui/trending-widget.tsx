export function TrendingWidget(): JSX.Element {
  return (
    <div className="rounded-2xl bg-[rgb(32,35,39)] p-4">
      <h2 className="text-lg font-bold text-gray-300">Trending</h2>

      <div className="flex justify-between mt-3">
        <div className="flex flex-col">
          <h2 className="text-white font-bold">Judging Session</h2>
          <p className="text-gray-500">Judging will begin now</p>
        </div>
        <img
          src="/assets/images/eth.png"
          alt="News Image"
          className="rounded-xl w-[60px] h-[60px]"
        />
      </div>
      <div className="flex justify-between mt-3">
        <div className="flex flex-col">
          <h2 className="text-white font-bold">Finalists Notified</h2>
          <p className="text-gray-500">
            Stay alert as you might make it to the Top 5!
          </p>
        </div>
        <img
          src="/assets/images/eth.png"
          alt="News Image"
          className="rounded-xl w-[60px] h-[60px]"
        />
      </div>
      <div className="flex justify-between mt-3">
        <div className="flex flex-col">
          <h2 className="text-white font-bold">Closing Ceremony</h2>
            <p className="text-gray-500">Come join us at the Main Stage to find out if you have won!</p>
        </div>
        <img
          src="/assets/images/eth.png"
          alt="News Image"
          className="rounded-xl w-[60px] h-[60px]"
        />
      </div>
    </div>
  );
}
