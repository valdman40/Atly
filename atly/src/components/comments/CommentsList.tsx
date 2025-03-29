import React, { useEffect, useState, useRef, useCallback } from 'react';
import Comment from '../../types/comment';
import CommentItem from './CommentItem';
import { getText } from '../../i18n/lang';
import LoadingIndicator from '../common/LoadingIndicator';

const amount = 20; // Number of comments to fetch at a time

const CommentsList: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchComments = async (page: number, limit: number = amount) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
            );
            const newComments = await response.json();
            setComments((comments) => [...comments, ...newComments]);
            // If fewer comments are returned than requested, we've reached the end.
            if (newComments.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasMore) {
            setLoading(true);
            setTimeout(() => {
                fetchComments(page);
            }, 2000);
        }
    }, [page]);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !loading) {
                setPage((page) => page + 1);
            }
        },
        [loading]
    );

    useEffect(() => {
        /**
         * This useEffect sets up the IntersectionObserver to implement infinite scrolling.
         * The observer watches the `observerRef` element (a div at the bottom of the list).
         * When the element becomes visible in the viewport, the `handleObserver` callback is triggered.
         * This increments the `page` state, which fetches the next set of comments.
         * 
         * Cleanup: The observer is disconnected when the component unmounts or dependencies change.
         */
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '200px',
            threshold: 1.0,
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [handleObserver]);

    return (
        <div>
            {comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
            <div ref={observerRef} style={{ height: '1px' }}></div>
            {loading && <LoadingIndicator />}
            {!hasMore && <span>{getText('FINISH_LOADING_COMMENTS')}</span>}
        </div>
    );
};

export default CommentsList;
