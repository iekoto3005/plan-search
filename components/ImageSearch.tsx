import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon, SearchIcon, SparklesIcon, XIcon } from './icons/Icons';

interface ImageSearchProps {
    onImageSearch: (file: File) => void;
    isLoading: boolean;
    error: string | null;
}

const ImageSearch: React.FC<ImageSearchProps> = ({ onImageSearch, isLoading, error }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (selectedFile: File | null) => {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            handleFileChange(event.dataTransfer.files[0]);
            event.dataTransfer.clearData();
        }
    }, []);

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            handleFileChange(event.target.files[0]);
        }
    };

    const handleTriggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSearch = () => {
        if (file && !isLoading) {
            onImageSearch(file);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="p-6 mb-8 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg space-y-4 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-yellow-400"/>
                画像でAI検索
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
                お好きな住宅の外観画像をアップロードして、似ているプランを検索します。
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <div
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onClick={handleTriggerFileInput}
                    className="relative w-full md:w-64 h-40 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex flex-col justify-center items-center text-center text-slate-500 dark:text-slate-400 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        className="hidden"
                        accept="image/*"
                    />
                    {preview ? (
                        <>
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
                            <button onClick={handleClear} className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75">
                                <XIcon className="w-4 h-4"/>
                            </button>
                        </>
                    ) : (
                        <>
                            <UploadIcon className="w-8 h-8 mb-2" />
                            <p className="text-sm">ドラッグ＆ドロップ</p>
                            <p className="text-xs">またはクリックして選択</p>
                        </>
                    )}
                </div>

                <div className="flex-grow flex flex-col justify-center">
                    <button
                        onClick={handleSearch}
                        disabled={!file || isLoading}
                        className="w-full md:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-300 dark:disabled:bg-blue-900/50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>解析中...</span>
                            </>
                        ) : (
                            <>
                                <SearchIcon className="w-5 h-5 mr-2"/>
                                <span>画像で検索</span>
                            </>
                        )}
                    </button>
                    {error && <p className="text-sm text-red-500 mt-2 text-center md:text-left">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default ImageSearch;
