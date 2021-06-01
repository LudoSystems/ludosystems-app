import { useCurrentUser } from "./CurrentUserContext";

const Home = () => {
    const { currentUser } = useCurrentUser();

    return (
        <div class="page-container home">
            <h1>Welcome{currentUser && (', ' + currentUser.username)}!</h1>
            <div class="content">
                
            </div>
        </div>
    );
};

export default Home;