import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

type Props = {
  name: string;
  university: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
};

export default function CreatorCard({
  name,
  university,
  role,
  image,
  github,
  linkedin,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg border hover:-translate-y-2 transition-transform duration-300 text-center cursor-pointer shadow-md shadow-black">
      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
        <Image
          src={image}
          alt={name}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>

      <p className="text-gray-600">{university}</p>

      <p className="text-sm text-gray-500">{role}</p>

      <div className="flex justify-center gap-4 mt-3">
        <a href={github} target="_blank" rel="noopener noreferrer">
          <Github className="w-5 h-5 text-gray-700 hover:text-black" />
        </a>

        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </a>
      </div>
    </div>
  );
}
