const {
  TreeNode,
  createBinarySearchTree,
} = require("../data-structures/Trees");

// SOLUTION using Hash Map
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
  const map = {};
  let result = [];
  let largest = 0;

  function search(root) {
    if (root == null) return;

    const value = root.val;

    map[value] == undefined ? (map[value] = 1) : (map[value] += 1);

    search(root.left);
    search(root.right);
  }

  search(root);

  for (let key in map) {
    const value = map[key];

    if (value >= largest) {
      if (value > largest) {
        result = [];
        largest = value;
      }

      result.push(parseInt(key));
    }
  }

  return result;
};

// SOLUTION using In Order Depth First Search

var findMode = function (root) {
  let result = [];
  let prev = root;
  let count = 0;
  let max = 0;

  function traverse(node) {
    if (node === null) return;

    traverse(node.left);

    count = prev.val === node.val ? count + 1 : 1;
    prev = node;

    if (count === max) {
      result.push(node.val);
    } else if (count > max) {
      max = count;
      result = [node.val];
    }

    traverse(node.right);
  }

  traverse(root);
  return result;
};

// Since trees contain duplicates I just made them by hand

let tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(2), null));
console.log(findMode(tree)); // [ 2 ]

tree = new TreeNode(1, null, new TreeNode(2, null, null));
console.log(findMode(tree)); // [ 1, 2 ]

tree = new TreeNode(
  50,
  new TreeNode(
    33,
    new TreeNode(22, new TreeNode(18), new TreeNode(25)),
    new TreeNode(33, new TreeNode(33), new TreeNode(37))
  ),
  new TreeNode(
    63,
    new TreeNode(63, new TreeNode(59), new TreeNode(63)),
    new TreeNode(72, new TreeNode(64), new TreeNode(79))
  )
);
console.log(findMode(tree)); // [ 33, 63 ]
