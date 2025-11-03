
import React, { useState } from 'react';
import { SearchIcon, SparklesIcon } from './icons/Icons';

interface NaturalLanguageInputProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
    error: string | null;
}

const NaturalLanguageInput: React.FC<NaturalLanguageInputProps> = ({ onSearch, isLoading, error }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !isLoading) {
            onSearch(query);
        }
    };

    return (
        <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-yellow-400"/>
                AIで検索
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                「南向きで100平米以上の住宅」のように入力してください。
            </p>
            <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="検索条件を入力..."
                    disabled={isLoading}
                    className="flex-grow bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-300 dark:disabled:bg-blue-900 disabled:cursor-not-allowed inline-flex items-center"
                >
                    {isLoading ? (
                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <SearchIcon className="w-5 h-5"/>
                    )}
                </button>
            </form>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default NaturalLanguageInput;
