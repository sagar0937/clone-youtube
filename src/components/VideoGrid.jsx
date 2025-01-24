import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingVideos } from "../store/slices/videosSlice";

function VideoGrid() {
  const dispatch = useDispatch();
  const { loading, error, videos } = useSelector((state) => state?.videos);

  // State to track the currently playing video
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    dispatch(fetchTrendingVideos());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex-1 pt-16 md:pl-64">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos?.map((video, index) => {
          const videoId = video.id?.videoId || video.id;

          return (
            <div
              key={videoId}
              className="flex flex-col space-y-2"
              onClick={() => setPlayingVideoId(videoId)} // Set the video to play on click
            >
              {playingVideoId === videoId ? (
                // If the video is clicked, show the YouTube player
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title={video.snippet?.title || "YouTube video player"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                // Show the thumbnail when the video is not playing
                <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={video?.snippet?.thumbnails?.medium?.url}
                    alt={video?.snippet?.title || "YouTube video thumbnail"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}

              {/* Video title */}
              <div className="text-sm font-semibold">
                {video?.snippet?.title}
              </div>
              {/* Channel name */}
              <div className="text-xs text-gray-500">
                {video?.snippet?.channelTitle}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default VideoGrid;
