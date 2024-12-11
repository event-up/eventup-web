type TagProps = {
  type: 'Yes' | 'No';
  children: React.ReactNode;
};

export const Tag: React.FC<TagProps> = ({ children, type }) => {
  return (
    <span
      className={` truncate max-w-[20vw] font-bold px-5 rounded-3xl ${
        type === 'Yes' ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      {children}
    </span>
  );
};
