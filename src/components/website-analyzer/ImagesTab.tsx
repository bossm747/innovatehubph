
interface ImagesTabProps {
  images: string[];
}

export const ImagesTab = ({ images }: ImagesTabProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="aspect-square overflow-hidden rounded-md border bg-muted">
          <img 
            src={image} 
            alt={`Image ${index}`} 
            className="h-full w-full object-cover object-center hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'public/placeholder.svg';
            }}
          />
        </div>
      ))}
    </div>
  );
};
