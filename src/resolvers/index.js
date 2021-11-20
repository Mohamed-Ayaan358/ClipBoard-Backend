const { User } = require("./../models/user.js");
const { Todo } = require("./../models/user.js");
const resolvers = {
  Query: {
    hello: () => "Hello world!",

    getTodos: async (parent, { username, searchdate }) => {
      const worklist = await User.find({
        username: username,
      });
      let needed_list = [];
      worklist.map((work) => {
        console.log(work.todos);
        work.todos.map((list) => {
          console.log(list);
          list._id = list._id.toString();
          if (list.date === searchdate) needed_list.push(list);
        });
      });
      return needed_list;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const c1 = await new User(args).save();
      c1._id = c1._id.toString();
      return c1;
    },
    addTodo: async (parent, { username, title, description, status, date }) => {
      //dates is auto genrated :
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      var today = dd + mm + yyyy;
      let newtodo = await new Todo({
        title,
        description,
        status,
        createdAt: today,
        date,
      });
      console.log(newtodo);
      const record1 = await User.findOneAndUpdate(
        { username: username },
        {
          $push: { todos: newtodo },
          //todos: [...(todos + newtodo)],
        }
      );
      console.log(record1);
      record1._id = record1._id.toString();
      return record1;
    },
  },
};

module.exports = resolvers;
