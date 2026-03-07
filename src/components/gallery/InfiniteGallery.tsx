import GalleryItem from './GalleryItem';
import './gallery.css';

const exampleImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=400&fit=crop',
];

const InfiniteGallery: React.FC = () => {
  // Duplicate items to create seamless loop
  const items = [...exampleImages, ...exampleImages, ...exampleImages];

  return (
    <div className="gallery-container relative w-full overflow-hidden py-10">
      {/* The Line - Static */}
      <div className="gallery-line"></div>

      {/* Scrolling Track */}
      <div className="gallery-track">
        {items.map((src, index) => (
          <GalleryItem
            key={`item-${index}`}
            imageSrc={src}
            altText={`Gallery image ${index}`}
            rotation={(index % 2 === 0 ? 2 : -2) + (Math.random() * 2 - 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteGallery;
