
import { Link, useNavigate } from "react-router-dom";

export default function BlogCard({ post, showActions, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    
    navigate("/post", { state: { post } });
  };

  return (
    <>
      <div className=" rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <Link to={`/posts/${post.id}`} className="block">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold  mb-2">{post.title}</h2>
            <p className="text-gray-300 mb-3 line-clamp-3 min-h-18 max-h-20 ">
              {post.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm text-gray-500">
                By {post.profiles.username} .{" "}
                {new Date(post.created_at).toDateString()}
              </span>
            </div>
          </div>
        </Link>
        {showActions && (
          <div className="flex space-x-2 justify-end m-2">
            <button onClick={handleEdit} className="btn  btn-primary">
              Edit
            </button>
            <button onClick={() => onDelete(post.id)} className="btn btn-error">
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
