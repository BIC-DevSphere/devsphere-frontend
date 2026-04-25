import './gallery.css';

interface GalleryItemProps {
  imageSrc: string;
  altText: string;
  rotation?: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ imageSrc, altText, rotation = 0 }) => {
  return (
    <div className="gallery-item transition-transform hover:scale-102 mx-8 flex-shrink-0" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="pin border-white border-2 shadow-lg z-10 rounded-sm bg-[#ef4444] w-3 h-10 absolute" />
      <div className="polaroid-card bg-white rounded-lg shadow-lg p-3 w-[250px]">
        <div className="overflow-hidden rounded-sm bg-gray-100">
          <img src={imageSrc} alt={altText} className="w-full h-52 object-cover bg-[#f3f4f6] rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
