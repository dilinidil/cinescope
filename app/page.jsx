import Image from "next/image";

const items = [{"name":"Dil","age":20},{"name":"Dil2","age":21}];

export default function Home() {
  // return (
  //   <div>
  //     <MyPost t="Woooh!" b="Awesome body" />
  //     <MyPost t="Woooh!2" b="Awesome body2" />
  //   </div>
  // );
  return items.map (item => 
  <>
    <MyPost t={item.name} b= {item.age}/>
  </>
  );
}

// function MyPost({t, b}){
//   return (
//     <div>
//       <h2>{t}</h2>
//       <p>{b}</p>
//     </div>
//   );
// }

function MyPost({t, b}){
  return (
    <div>
      <MyPostTitle title ={t} />
      <MyPostBody body ={b}/>
    </div>
  );
}

function MyPostTitle({title}){
  return (
    <h1>{title}</h1>
  );
}

function MyPostBody({body}){
  return(
    <p>{body}</p>
  );
}