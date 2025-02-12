// import React, { useContext } from 'react'
// import { GlobalContext } from '../context/Context';
// import { Card } from 'react-bootstrap';
// import moment from 'moment';    
// import Swal from 'sweetalert2';
// const PostCard = ({posts,editPost, deletePost, }) => {
//     let {state , dispatch} = useContext(GlobalContext)
//     return (
//         {posts.map((post) => (
//             <div key={post.id} className="bg-white p-4 shadow-md rounded-lg mb-4">
//                 <div className='flex items-center space-x-3'>
//                     <img src={post.userProfile} alt="User" className='w-12 h-12 rounded-full' style={{height: "100px"}}/>
//                     <div>
//                         <h5 className='font-bold'>{post.userName}</h5>
//                         <p>{post?.postDate?.seconds ? moment((post?.postDate?.seconds * 1000)).fromNow() : "Just Now"}</p>

//                     </div>
//                 </div>
//                 <p className='mt-2'>{post.postText}</p>
//                 {post.postFile && <img src={post.postFile} alt="" className=' object-cover mt-2 rounded-lg' style={{height: "125px"}} />}
//                 <div className='flex justify-end space-x-2 div0' >
//                     <Button className='bg-red-500 text-white py-1 px-3 rounded-md' onClick={() => {
//                         Swal.fire({
//                             title: "Do you want to delete this post?",
//                             icon: "warning",
//                             showCancelButton: true,
//                             confirmButtonText: "Delete",
//                         }).then((result) => {
//                             if (result.isConfirmed) deletePost(post.id);
//                         });
//                     }}>Delete</Button>
//                     <Button className='bg-yellow-500 text-white py-1 px-3 rounded-md' onClick={() => editPost(post.postText, post.id)}>Edit</Button>
//                 </div>
//             </div>
//         ))}
//     )
// }
// export default PostCard