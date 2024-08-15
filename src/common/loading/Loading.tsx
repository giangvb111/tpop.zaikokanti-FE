"use client";
import React from 'react';
import '../../assets/Loading.css';
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/redux/store";

const Loading: React.FC = () => {

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

    const isLoading = useTypedSelector(
        (state) => state.loadingReducer.value.isLoading,
    );
    if (!isLoading) return null;

    return (
        <div className="loader-overlay">
            <div className="loader"></div>
        </div>
    );
};

export default Loading;
