import { useCurrentUser } from "./CurrentUserContext";

const Home = () => {
    const { currentUser } = useCurrentUser();

    return (
        <div className="page-container home">
            <h1>Welcome{currentUser && (', ' + currentUser.username)}!</h1>
            <div className="content">

            </div>
        </div>
    );
};

export default Home;