import { useCurrentUser } from "./CurrentUserContext";

import { Image, Transformation } from 'cloudinary-react';

const Home = () => {
    const { currentUser } = useCurrentUser();


    return (
        <div className="page-container home">
            <h1>Welcome{currentUser && (', ' + currentUser.username)}!</h1>
            <div className="content">
                <p>Ludo.Systems is a set of visual game development tools designed for non-programmmers, exportable in common formats that are easy for programmers to add to almost any game engine.</p>
                <h2 id="Pre-Release">Pre-Release</h2>
                <p className="disclaimer"><strong><span className="warning-text">Warning:</span> Ludo.Systems is currently a pre-alpha, experimental project.</strong></p>
                <p>Data saved to Ludo.Systems should not yet be considered secure, nor safe from random deletion. I would love for you to try it out and provide feedback, but please keep copies of any text elsewhere in case of disaster.</p>
                <p>One specific note I’d make is to not work on this in more than one tab at the moment.</p>
                <p>I would be very thankful for any feedback on crashes, things breaking, or desired features / changes on <a href="https://github.com/ludosystems" target="_blank" rel="noreferrer noopener">GitHub</a> or <a href="https://twitter.com/Ludo_Systems" target="_blank" rel="noreferrer noopener">@Ludo_Systems</a> on Twitter.</p>
                <h2 id="Nodes">Nodes</h2>
                <p>Nodes is the only tool currently available. You can use it to set up game logic that makes more sense to plan with a graph than in a text editor, such as game conversations or quest systems. </p>
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
                    <li>Technical improvements to improve security and stability.</li>
                    <li>The ability to reorder attributes.</li>
                    <li>List Attributes – create list attributes to use presets in your nodes (e.g., a character selector list, a list of common actions on quest completion, etc.).</li>
                    <li>Ability to work in multiple tabs.</li>
                    <li>Payment / Subscription Integration.</li>
                    <li>Ability to save multiple different projects to a user account.</li>
                    <li>Collaboration between users.</li>
                    <li>Save graph position and zoom level to account so it reopens to the same place every time.</li>
                    <li>Change node colours.</li>
                    <li>Ability to adjust background brightness.</li>
                </ul>
                <h2 id="Development">Development</h2>
                <p>Ludo.Systems has so far been developed on by just one person, <a href="https://abbieschenk.com" target="_blank" rel="noreferrer noopener">me</a>. If you’re interested in contributing or want to report a bug, please check out the <a href="https://github.com/LudoSystems">GitHub repositories</a> — but fair warning that I do intend to someday release a stable version on a subscription-based Software-as-a-Service model.</p>
                <p>Ludo.Systems draws from <a href="https://abbieschenk.com/projects/scriptease-ii/" target="_blank" rel="noreferrer noopener">my first programming experience working on ScriptEase II</a> at the University of Alberta, a visual game development program that worked with different translators to integrate with game engines. I worked a lot on a node-based system that was used to create and edit conversations and quests (sound familiar?). ScriptEase II is now open source, and at this point likely out of date.</p>
                <p>I used those concepts to create <a href="https://abbieschenk.com/projects/catlandia/#convogame" target="_blank" rel="noreferrer noopener">ConvoGame</a>, an internal dialogue editor tool for an independent video game. I always wanted to take this idea further.</p>
            </div>
        </div>
    );
};

export default Home;