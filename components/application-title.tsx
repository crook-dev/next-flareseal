interface ApplicationIconProps {
    title: string;  
    children: React.ReactNode;
  }
  
export default function ApplicationIcon({ title, children }: ApplicationIconProps) {
    return (
      <div className="w-auto text-center">
        <div className="w-32">
          {children} 
          <p className="text-xs">{title}</p>  
        </div>
      </div>
    );
}