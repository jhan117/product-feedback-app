import classes from "./Layout.module.css";

function Layout(props) {
  return (
    <div id={classes.body}>
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
