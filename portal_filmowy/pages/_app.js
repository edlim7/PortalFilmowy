import "../styles/globals.css";
import { ModalContextProvider } from "../contexts/ModalContext";
import { AppContextProvider } from "../contexts/AppContext";
function MyApp({ Component, pageProps }) {
	return (
		<AppContextProvider>
		<ModalContextProvider>
			<Component {...pageProps} />
		</ModalContextProvider>
		</AppContextProvider>
	);
}

export default MyApp;
