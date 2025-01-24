import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../store/slices/videosSlice";
import { formatDistanceToNow } from "date-fns";

function VideoGrid() {
  const dispatch = useDispatch();
  const { items: videos, loading, page } = useSelector((state) => state.videos);
  const observer = useRef();

  const lastVideoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchVideos(page));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, dispatch]
  );

  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchVideos(1));
    }
  }, [dispatch, videos.length]);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };

  return (
    <main className="flex-1 pt-16 md:pl-64">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            ref={index === videos.length - 1 ? lastVideoRef : null}
            className="flex flex-col space-y-2"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex space-x-3">
              <img
                src={video.channelAvatar}
                alt={video.channelTitle}
                className="w-9 h-9 rounded-full"
              />
              <div>
                <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.channelTitle}</p>
                <p className="text-sm text-gray-600">
                  {formatViews(video.views)} views •{" "}
                  {formatDistanceToNow(new Date(video.publishedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </main>
  );
}

export default VideoGrid;
