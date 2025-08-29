import Image from "next/image";

export default function Logo() {
  return (
    <div className="w-28 h-10 flex items-center justify-center">
      <Image
        src="/logo.jpeg"
        alt="Company Logo"
        width={112}
        height={40}
        className="object-contain"
        priority
      />
    </div>
  );
}
