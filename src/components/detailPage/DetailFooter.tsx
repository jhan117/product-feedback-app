import Card from "../ui/Card";
import NewCommentForm from "./NewCommentForm";
import classes from "./DetailFooter.module.css";

const DetailFooter = () => {
  return (
    <footer>
      <Card className={classes.card}>
        <h4>Add Comment</h4>
        <NewCommentForm isComment={true} />
      </Card>
    </footer>
  );
};

export default DetailFooter;
