export function innerJointById( array1, array2){
    let ret = [];
    array1.forEach((node) => {
        array2.every((node2) => {
          if(node2.id != node.id){
            return true;
          }

          ret.push({ ...node , ...node2})
          return false;
        })
    })
    return ret;
}