import React, { useContext, useEffect, useState } from 'react';
import { getFirestore, updateDoc, collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { GlobalContext } from '../context/Context';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import "./Home.css";

const Home = () => {
    const [postCaption, setPostCaption] = useState("");
    const [posts, setPosts] = useState([]);
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const [currentCaption, setCurrentCaption] = useState("");
    const [currentPostId, setCurrentPostId] = useState("");

    const { state } = useContext(GlobalContext);
    const db = getFirestore();

    const uploadImage = async () => {
        if (!file) return "";
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "posts-image");
            const res = await axios.post("https://api.cloudinary.com/v1_1/dw2jrfzql/upload", formData);
            return res.data.url;
        } catch (error) {
            Swal.fire("Error", "Image upload failed", "error");
            return "";
        }
    };

    const addPost = async (e) => {
        e.preventDefault();
        let postFile = "";
        try {
            postFile = await uploadImage();
        } catch (error) {
            return;
        }

        try {
            await addDoc(collection(db, "posts"), {
                userName: state.user?.displayName,
                userEmail: state.user?.email,
                userProfile: state.user?.photoURL,
                userId: state.user?.uid,
                postText: postCaption,
                postDate: serverTimestamp(),
                postFile: postFile
            });
            setPostCaption("");
            setFile(null);
        } catch (error) {
            Swal.fire("Error", "Failed to add post", "error");
        }
    };

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("postDate", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const realTimePosts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPosts(realTimePosts);
        });
        return () => unsubscribe();
    }, [db]);

    const deletePost = async (id) => {
        try {
            await deleteDoc(doc(db, "posts", id));
        } catch (error) {
            Swal.fire("Error", "Failed to delete post", "error");
        }
    };

    const updatePost = async () => {
        try {
            await updateDoc(doc(db, "posts", currentPostId), {
                postText: currentCaption
            });
            handleClose();
        } catch (error) {
            Swal.fire("Error", "Failed to update post", "error");
        }
    };

    const handleClose = () => {
        setShow(false);
        setCurrentCaption("");
        setCurrentPostId("");
    };

    const editPost = (text, id) => {
        setShow(true);
        setCurrentCaption(text);
        setCurrentPostId(id);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={addPost} className="bg-white p-4 shadow-md rounded-lg mb-4">
                <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder="What's on your mind?"
                    value={postCaption}
                    onChange={(e) => setPostCaption(e.target.value)}
                />
                <input
                    type="file"
                    className="mt-2"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Button type="submit" className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md">Post</Button>
            </form>
            {posts.map((post) => (
                <div key={post.id} className="bg-white p-4 shadow-md rounded-lg mb-4">
                    <div className='flex items-center space-x-3'>
                        <img src={post.userProfile} alt="User" className='w-12 h-12 rounded-full' style={{ height: "100px" }} />
                        <div>
                            <h5 className='font-bold'>{post.userName}</h5>
                            <p>{post?.postDate?.seconds ? moment((post?.postDate?.seconds * 1000)).fromNow() : "Just Now"}</p>
                        </div>
                    </div>
                    <p className='mt-2'>{post.postText}</p>
                    {post.postFile && <img src={post.postFile} alt="" className='object-cover mt-2 rounded-lg' style={{ height: "125px" }} />}
                    <div className='flex justify-end space-x-2 div0'>
                        {(state.user?.uid == post.userId) ?
                            <>
                                <Button className='bg-red-500 text-white py-1 px-3 rounded-md' onClick={() => {
                                    Swal.fire({
                                        title: "Do you want to delete this post?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Delete",
                                    }).then((result) => {
                                        if (result.isConfirmed) deletePost(post.id);
                                    });
                                }}>Delete</Button>
                                <Button className='bg-yellow-500 text-white py-1 px-3 rounded-md' onClick={() => editPost(post.postText, post.id)}>Edit</Button>
                            </>
                            :
                            null
                        }
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="text" value={currentCaption} onChange={(e) => setCurrentCaption(e.target.value)} className='w-full p-2 border rounded-md' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={updatePost}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ))}
        </div>
    );
};

export default Home;
