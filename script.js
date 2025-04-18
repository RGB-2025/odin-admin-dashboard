let data = {};

function createIcon(parent, iconLink, className) {
    let icon = document.createElement('img');
    icon.className = className;
    icon.src = iconLink;
    parent.appendChild(icon);
}

fetch('./data.json')
    .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then((json) => {
        data = json;
        data['projects'].forEach(project => {
            let card = document.createElement('article');
            card.className = 'card';

            const color =  project.hasOwnProperty('color') ? project['color'] : '#007BFF';
            card.style.borderLeft = `6px solid ${color}`;

            // image
            let image = document.createElement('img');
            image.src = project['img'];
            image.alt = project.hasOwnProperty('alt') ? project['alt'] : project['title'];
            image.style.width = '100%';
            image.style.height = 'auto';
            image.style.objectFit = 'contain';
            image.style.aspectRatio = '16/9';


            // content
            let content = document.createElement('div');
            content.className = 'content';

            let title = document.createElement('h3');
            let desc = document.createElement('p');
            title.textContent = project['title'];
            desc.textContent = project['content'];

            content.append(title, desc);


            // links
            let links = document.createElement('nav');
            links.className = 'links'

            let favorite = document.createElement('a');
            let copyLink = document.createElement('a');
            let open = document.createElement('a');

            createIcon(
                favorite,
                project['favorite'] ? '.\\icons\\links\\star.svg' : '.\\icons\\links\\star-outline.svg',
                'icon'
            );

            createIcon(
                copyLink,
                '.\\icons\\links\\link.svg',
                'icon'
            );

            createIcon(
                open,
                '.\\icons\\links\\open-in-new.svg',
                'icon'
            );

            favorite.addEventListener('click', () => {
                project['favorite'] = !project['favorite'];
            
                favorite.firstChild.src = project['favorite'] // I don't know how to edit the json yet so that would do
                    ? '.\\icons\\links\\star.svg' 
                    : '.\\icons\\links\\star-outline.svg';
            });
            favorite.href = 'javascript:void(0)';
            copyLink.addEventListener('click', () => navigator.clipboard.writeText(project['link']));
            copyLink.href = 'javascript:void(0)';
            open.href = project['link'];
            open.target = '_blank';
            open.rel = 'noreferrer noopener';

            favorite.setAttribute('title', 'Add to favorites');
            copyLink.setAttribute('title', 'Copy link');
            open.setAttribute('title', 'Open project');

            links.append(favorite, copyLink, open);

            // append
            card.append(image, content, links);
            document.getElementById('yp-container').appendChild(card);
        });

        data['announcements'].forEach(announcement => {
            let announcementContainer = document.createElement('article');
            let title = document.createElement('h3');
            let content = document.createElement('p');

            title.textContent = announcement['title'];
            content.textContent = announcement['content'];
            
            announcementContainer.append(title, content);
            document.getElementById('a-container').appendChild(announcementContainer);
        })

        data['trending'].forEach(profile => {
            let profileContainer = document.createElement('div');
            profileContainer.className = 'profile';

            let profilePic = document.createElement('img');
            profilePic.src = profile['profilePic'];
            profilePic.alt = '@' + profile['tag'];

            let content = document.createElement('div');

            let tag = document.createElement('h3');
            tag.textContent = '@' + profile['tag'];

            let tagline = document.createElement('p');
            tagline.textContent = profile['tagline'];

            content.append(tag, tagline);
            profileContainer.append(profilePic, content);
            document.getElementById('t-container').appendChild(profileContainer);
        })
    });