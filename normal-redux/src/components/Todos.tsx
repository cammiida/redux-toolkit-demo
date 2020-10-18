import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { TodoType } from "../store/todos/types";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type TodosProps = {
  todos: TodoType[];
  handleToggle: (index: number) => void;
};

const Todos: React.FC<TodosProps> = ({ todos, handleToggle }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Todos
        </Typography>
        <List className={classes.root}>
          {todos.map((todo, index) => {
            return (
              <ListItem key={todo.id}>
                <ListItemIcon onClick={() => handleToggle(index)}>
                  <Checkbox edge="start" checked={todo.completed} />
                </ListItemIcon>
                <ListItemText>{todo.title}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default Todos;
