const protocol = 'http';
const api_host = '127.0.0.1';
const api_port = 5000;

function api_base_url() {
    return protocol + '://' + api_host + ':' + api_port;
}

function endpoint_url(endpoint) {
    return api_base_url() + endpoint;
}

const get_header = {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
};

export async function fetchCollections() {
    return fetch(endpoint_url('/collections'), get_header);
}

export async function fetchTypes(collection_id) {
    return fetch(endpoint_url('/collections/' + collection_id + '/types'), get_header);
}

export async function fetchBookmarks(collection_id, type_name) {
    let endpoint = '/collections/' + collection_id + '/bookmarks';
    if (type_name) {
        endpoint += '?type=' + type_name;
    }
    return fetch(endpoint_url(endpoint), get_header);
}

export async function searchBookmarks(collection_id, search) {
    let endpoint = '/collections/' + collection_id + '/bookmarks?query=' + search + '&match=name';
    return fetch(endpoint_url(endpoint), get_header);
}

export async function fetchTags(bookmark_id) {
    return fetch(endpoint_url('/bookmarks/' + bookmark_id + '/tags'), get_header);
}

export async function deleteBookmark(collection_id, bookmark_id) {
    return fetch(endpoint_url('/collections/' + collection_id + '/bookmarks/' + bookmark_id), {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': 'content-type',
                'Access-Control-Request-Method': 'POST',
            }
        });
}

export async function addTag(bookmark_id, tag_bookmark_id) {
    const data = {
        'tag_bookmark_id': tag_bookmark_id
    };

    return fetch(endpoint_url('/bookmarks/' + bookmark_id + '/tags'), {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': 'content-type',
            'Access-Control-Request-Method': 'POST',
        }
    });
}

export async function addBookmark(collection_id, data) {
    return fetch(endpoint_url('/collections/' + collection_id + '/bookmarks'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': 'content-type',
                'Access-Control-Request-Method': 'POST',
            }
        });
}

export async function addCollection(data) {
    return fetch(endpoint_url('/collections'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': 'content-type',
                'Access-Control-Request-Method': 'POST',
            }
        });
}

export async function signup(email, password) {
    const data = {
        'email': email,
        'password': password,
    };

    return fetch(endpoint_url('/users'), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': 'content-type',
                'Access-Control-Request-Method': 'POST',
            }
        })


}

export async function login(email, password) {
    const data = {
        'email': email,
        'password': password,
    };

    return fetch(endpoint_url('/users/login'), {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Request-Headers': 'content-type',
                        'Access-Control-Request-Method': 'POST',
                    }
        });
}