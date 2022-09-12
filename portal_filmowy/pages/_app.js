import "../styles/globals.css";
import { ModalContextProvider } from "../contexts/ModalContext";
function MyApp({ Component, pageProps }) {
	return (
		<ModalContextProvider>
			<Component {...pageProps} />
		</ModalContextProvider>
	);
}

export default MyApp;
