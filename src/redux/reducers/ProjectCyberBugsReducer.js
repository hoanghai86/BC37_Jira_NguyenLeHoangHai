const stateDefault = {
  projectList: [
    {
      id: 10450,
      projectName: "new Project 1",
      description: "new Project 1",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "new-project-1",
      deleted: false,
    },
    {
      id: 10455,
      projectName: "new project 2",
      description: "456",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "new-project-2",
      deleted: false,
    },
    {
      id: 10456,
      projectName: "new project 3",
      description: "<p>333</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "new-project-3",
      deleted: false,
    },
    {
      id: 10457,
      projectName: "new project 4",
      description: "<p>4</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "new-project-4",
      deleted: false,
    },
  ],
};

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      // console.log(action.projectList)
      return { ...state };
    }

    default:
      return { ...state };
  }
};
