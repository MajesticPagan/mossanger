import "./globals.css";
import { Inter } from "next/font/google";

import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Mossanger",
	description: "Messenger type clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-pt">
			<body className={inter.className}>
				<AuthContext>
					<ToasterContext />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
