import { useCurrentUser } from "./CurrentUserContext";

import { Image, Transformation } from 'cloudinary-react';

const Home = () => {
    const { currentUser } = useCurrentUser();


    return (
        <div className="page-container home">
            <h1>Welcome{currentUser && (', ' + currentUser.username)}!</h1>
            <div className="content">
                <p>Ludo.Systems is a set of visual game development tools designed for non-programmmers, exportable in common formats that are easy for programmers to add to almost any game engine.</p>
                <iframe className="video" width="560" height="315" src="https://www.youtube.com/embed/8LtmX2naGvc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <h2 id="Pre-Release">Pre-Release</h2>
                <p className="disclaimer"><strong><span className="warning-text">Note:</span> Ludo.Systems was open in an experimental state but is closed for now.</strong></p>
                <p>LudoSystems was deployed on Heroku but is currently no longer active. If this project interests you, please <a href="https://abbieschenk.com">contact me</a>.</p>
                <h2 id="Nodes">Nodes</h2>
                <p>Nodes is the only tool currently available. You can use it to set up parts of your game that make more sense to plan with a graph than in a text editor, such as game conversations or quest systems. </p>
                <h3>An example of a branching conversation</h3>
                <Image cloudName="abbieschenk" dpr="auto" responsive width="auto" crop="scale" publicId="/projects/ludo-systems/dialogue_iodzkr.png">
                    <Transformation radius="20" />
                </Image>
                <h3>An example of a branching quest system</h3>
                <Image cloudName="abbieschenk" dpr="auto" responsive width="auto" crop="scale" publicId="/projects/ludo-systems/quest_oz8n3d.png">
                    <Transformation radius="20" />
                </Image>
                <h2 id="Planned Features">Planned Features</h2>
                <p>The next features planned for release are, in order of priority:</p>
                <ul>
                    <li>Technical improvements on security and stability.</li>
                    <li>Ability to reorder attributes.</li>
                    <li>List Attributes to use as presets in your nodes (e.g., a character selector list, a list of common actions on quest completion, etc.).</li>
                    <li>Autocomplete on attribute titles</li>
                    <li>Ability to work in multiple tabs.</li>
                    <li>Some form of subscription Integration.</li>
                    <li>Ability to save multiple different projects to a user account.</li>
                    <li>Collaboration between users.</li>
                    <li>Save graph position and zoom level to account so it reopens to the same place every time.</li>
                    <li>Change node colours.</li>
                    <li>Ability to adjust background brightness.</li>
                </ul>
                <h2 id="Development">Development</h2>
                <p>Ludo.Systems has so far been developed and designed entirely by me, <a href="https://abbieschenk.com" target="_blank" rel="noreferrer noopener">Abbie Schenk</a>. If you’re interested in contributing or want to report a bug, please check out the <a href="https://github.com/LudoSystems">GitHub repositories</a>. Fair warning that while Ludo.Systems will stay open source, I intend to someday release a stable version on a subscription-based Software-as-a-Service model.</p>
                <p>Ludo.Systems draws from <a href="https://abbieschenk.com/projects/scriptease-ii/" target="_blank" rel="noreferrer noopener">my first programming experience working on ScriptEase II</a> at the University of Alberta, a visual game development program that worked with different translators to integrate with game engines. I worked a lot on a node-based system that was used to create and edit conversations and quests (sound familiar?). ScriptEase II is now open source, and at this point likely out of date.</p>
                <p>I used those concepts to create <a href="https://abbieschenk.com/projects/catlandia/#convogame" target="_blank" rel="noreferrer noopener">ConvoGame</a>, an internal dialogue editor tool for an independent video game. I always wanted to take this idea further. Ludo.Systems is the next continuation of my career-long research into visual development systems.</p>
            </div>
        </div>
    );
};

export default Home;