
interface ColorsTabProps {
  colors: string[];
}

export const ColorsTab = ({ colors }: ColorsTabProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {colors.map((color, index) => (
        <div key={index} className="aspect-square rounded-md border overflow-hidden">
          <div 
            className="h-3/4 w-full" 
            style={{ backgroundColor: color }}
          ></div>
          <div className="p-2 text-xs font-mono">{color}</div>
        </div>
      ))}
    </div>
  );
};
