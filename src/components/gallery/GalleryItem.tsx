import './gallery.css';

interface GalleryItemProps {
  imageSrc: string;
  altText: string;
  rotation?: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ imageSrc, altText, rotation = 0 }) => {
  return (
    <div className="gallery-item flex-shrink-0" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="pin" />
      <div className="polaroid-card">
        <div className="polaroid-image-container overflow-hidden rounded-sm bg-gray-100">
          <img src={imageSrc} alt={altText} className="polaroid-image" />
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
