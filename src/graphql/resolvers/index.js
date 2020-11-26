import axios from 'axios';
const db = 'http://localhost:3004';

const Query = {
    agent: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/users/${args.id}`);
        return response.data;
    },

    agents: async (parent, args, contenxt, info) => {
        const name = args.name != null ? `name=${args.name}` : '';
        const age = args.age != null ? `age=${args.age}` : ''

        const response = await axios.get(`${db}/users?${name}&${age}`);
        return response.data;
    },

    posts: async (parent, args, contenxt, info) => {
        const response = await axios.get(`${db}/posts/`);
        return response.data;
    },

    post: async (parent, args, contenxt, info) => {
        const response = await axios.get(`${db}/posts/${args.id}`);
        return response.data;
    },

    pictures: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/pictures`);
        return response.data;
    },

    getAnimal: async (parent, args, context, info) => {
        let response;
        let random = Math.floor(Math.random() * 6) + 1;

        if(random > 3) {
            response = {
                animal: 'Dog',
                name: 'Captain',
                hair: 'lots'
            }
        }else {
            response = {
                animal: 'Cat',
                name: 'Fluffy',
                paws: 'sharp'
            }
        }

        return response;
    }

    /* multiply: async (paren, args, context, info) => {
        return args.value * 10;
    },

    cars: () => {
        return ['Ford', 'Mazda', 'Porshe'];
    },

    msg: (parent, args, contenxt, info) => {
        if(args.values.length === 0) {
            return `Sorry, no values`;
        }

        return `Hello ${args.values[0]} ${args.values[1]}`;
    }, */
}

const Mutation = {
    createAgent: async (parent, args, context, info) => {
        const response = await axios.post(`${db}/users`, {
            name: args.data.name,
            age: args.data.age,
            married: args.data.married,
            average: 0,
            status: args.data.status
        });

        return response.data;
    },

    deleteAgent: async (parent, args, context, info) => {
        const response = await axios.delete(`${db}/users/${args.id}`);

        if (Object.keys(response.data).length === 0) {
            return true;
        }

        return false;
    },

    updateAgent: async (parent, args, context, info) => {
        let datas = {};
        if(args.data.name !== undefined) {
            datas.name = args.data.name;
        }
        
        if(args.data.age !== undefined) {
            datas.age = args.data.age;
        }
        
        if(args.data.married !== undefined) {
            datas.married = args.data.married;
        }
        
        if(args.data.average !== undefined) {
            datas.average = args.data.average;
        }

        if(args.data.status !== undefined) {
            datas.status = args.data.status;
        }

        const response = await axios.patch(`${db}/users/${args.id}`, datas);
        return response.data;
    },

    createPost: async (parent, args, context, info) => {
        //get token = user id
        // go to store picture === get id of the picture

        const response = await axios.post(`${db}/posts`, {
            title: args.title,
            content: args.content,
            author: 1,
            picture: 1,
            status: args.status
        });

        return response.data;
    },

    deletePost: async (parent, args, content, info) => {
        const response = await axios.delete(`${db}/posts/${args.id}`);
        if (Object.keys(response.data).length === 0) {
            return true;
        }
        return false;
    }
}

const Post = {
    author: async (parent, args, contenxt, info) => {
        try {
            const response = await axios.get(`${db}/users/${parent.author}`);
            return response.data;
        } catch (error) {
            return null;
        }
    },

    picture: async (parent, args, content, info) => {
        const response = await axios.get(`${db}/pictures/${parent.picture}`);
        return response.data;
    },
}

const User = {
    posts: async (parent, args, contenxt, info) => {
        const response = await axios.get(`${db}/posts?author=${parent.id}`);
        return response.data;
    },

    pictures: async (parent, args, context, info) => {
        const response = await axios.get(`${db}/pictures?author=${parent.id}`);
        return response.data;
    },
}

const Pictures = {
    author: async (parent, args, content, info) => {
        const response = await axios.get(`${db}/users/${parent.author}`);
        return response.data;
    },
    post: async (parent, args, content, info) => {
        const response = await axios.get(`${db}/posts/${parent.post}`);
        return response.data;
    },
}

/*const AnimalUnion = {
    __resolveType(obj, context, info) {
        if(obj.hair) {
            return 'Dog'
        }

        if(obj.paws) {
            return 'Cat'
        }

        return null;
    }
}*/

const Animal = {
    __resolveType(obj, context, info) {
        if(obj.hair) {
            return 'Dog'
        }

        if(obj.paws) {
            return 'Cat'
        }

        return null;
    }
}

export {
    Query,
    Mutation,
    Post,
    User,
    Pictures,
    //AnimalUnion,
    Animal
};
