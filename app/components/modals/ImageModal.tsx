"use client";

import Image from "next/image";
import Modal from "./Modal";

interface ImageModalProps {
	image?: string | null;
	isOpen?: boolean;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
	if (!image) {
		return null;
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="w-80 h-80">
				<Image alt="Imagem" className="object-cover" src={image} fill />
			</div>
		</Modal>
	);
};

export default ImageModal;
