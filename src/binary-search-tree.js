const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor(){
    this.treeRoot = null;
  }

  root() {
    // return root node of the tree
    return this.treeRoot;
  }

  add(data) {
    //add node with data to the tree
    let newNode = new Node(data);
    if (this.treeRoot === null) {
      this.treeRoot = newNode;
    } else {
      this.addNode(this.treeRoot, newNode);
    }
    return this;
  }

  addNode(root, newNode) {
    // addNode method
    if (newNode.data < root.data) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.addNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.addNode(root.right, newNode);
      }
    }
  }

  search(root, data) {
    //search method for the tree
    if (root === null) {
      return null;
    } else if (data > root.data) {
      return this.search(root.right, data);
    } else if (data < root.data) {
      return this.search(root.left, data);
    } else {
      return root;
    }

  }
  has(data) {
    //returns true if node with the data exists in the tree and false otherwise
    return (this.search(this.treeRoot, data) != null) 
  }

  find(data) {
    //returns node with the data if node with the data exists in the tree and null otherwise
    return this.search(this.treeRoot, data);
  }

  removeNode(root, data) {
    //removeNode method
    if (root === null) {
      return null;
    } else if (data > root.data) {
      root.right = this.removeNode(root.right, data);
    } else if (data < root.data) {
      root.left = this.removeNode(root.left, data);
    } else { 
      // if you have to remove root node
      if (root.right === null && root.left === null) {
        root = null;
      } else if (root.right === null) {
        root = root.left;
      } else if (root.left === null) {
        root = root.right;
      } else {
        let newNode = this.minNode(root.right);
        root.data = newNode.data;
        root.right = this.removeNode(root.right, newNode.data);
      }
    }
    return root;
  }

  minNode(root) {
    //min node method
    if (root.left === null) {
      return root;
    } else {
      return this.minNode(root.left);
    }
  }

  maxNode(root) {
    //max node method
    if (root.right === null) {
      return root;
    } else {
      return this.maxNode(root.right);
    }
  }

  remove(data) {
    //removes node with the data from the tree if node with the data exists
    this.treeRoot = this.removeNode(this.treeRoot, data);
    return this;
  }

  min() {
    //returns minimal value stored in the tree (or null if tree has no nodes)
    if (!this.treeRoot) {
      return null;
    }
    return this.minNode(this.treeRoot).data;
  }

  max() {
    // returns maximal value stored in the tree (or null if tree has no nodes)
    if (!this.treeRoot) {
      return null;
    }
    return this.maxNode(this.treeRoot).data;
  }

}