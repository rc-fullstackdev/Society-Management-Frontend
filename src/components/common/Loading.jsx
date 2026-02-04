import React from "react";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-3">
                <h6 className="text-sm font-medium text-gray-700">Please Wait...</h6>

                <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            </div>
        </div>
    );
};

export default Loading;
