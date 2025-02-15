## 1. 回调函数完成异步操作

```javascript
function requestData(url, successCallback, failureCallback){
    setTimeout(() => {
        if(url === "123456"){
            successCallback({
                name: "李志洪",
                age: 18,
                gender: "男"
            });
        }else{
            let failureMessage = "请求失败, 请检查网络";
            failureCallback(failureMessage);
        }
    }, 3000);
}

requestData("123456", res => {
    console.log(res);
}, err => {
    console.log(err);
});
```

## 2. 使用 Promise 完成异步操作

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: "李志洪",
            age: "18",
            gender: "男"
        });
        reject("请求错误, 请检查网络!!!!");
    }, 3000);
});

promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
});
```

## 3. 为什么使用 Promise？

在以前虽然回调函数可以解决异步操作的问题，但回调函数缺少规范性。每个程序员写的异步操作函数都会有所不同，导致每次调用一个库的异步操作函数时都需要查阅文档或查看源代码。而 Promise 的出现解决了这一问题，虽然代码量有所增加，但通过规范提高了代码之间的沟通性。

## 4. `resolve` 传入 Promise

```javascript
const newPromise = new Promise((resolve, reject) => {
    resolve("aaaaaaaa");
});
const promise = new Promise((resolve, reject) => {
    resolve(newPromise);
});

promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
});
```

## 5. `Promise.prototype` 对象方法

### 5.1 `then()`

- `.then()` 会接受两个回调函数，如果 `Promise` 执行 `resolve` 则执行第一个回调，如果 `Promise` 执行 `reject` 则执行第二个回调。

```javascript
const promise = new Promise((resolve, reject) => {
    resolve({
        name: "李志洪",
        age: 18,
        gender: "男"
    });
    reject("请求失败");
});

promise.then(res => {
    console.log(res);
}, err => {
    console.log(err);
});
```

### 5.2 `then()` 的返回值是一个新的 `Promise`

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("111111");
});
console.log(promise);

const newPromise = promise.then(res => {
    console.log(res);
    return "aaaaaa";
}); // 返回的是一个新的 Promise
console.log(newPromise);
```

### 5.3 链式调用 `then()`

```javascript
const promise = new Promise((resolve, reject) => {
    resolve({name: "李志洪", age: 18, gender: "男"});
});

promise.then(res => {
    console.log("res:", res); // "res: {name: "李志洪", age: 18, gender: "男"}"
    return {
        then: function(resolve, reject){
            const isSucceed = true;
            if(isSucceed){
                resolve("aaaaaaa");
            }else{
                reject("bbbbbbb");
            }
        }
    };
}).then(res => {
    console.log(res); // "aaaaaaa"
    return new Promise((resolve, reject) => {
        resolve("你好, 世界");
    });
}).then(res => {
    console.log(res); // "你好世界"
});
```

**注意点**:

1. 当返回一个含有 `then` 的对象时（即 thenable 对象），它的 `then` 方法会接受 `resolve` 和 `reject` 两个回调函数，用于标记 `Promise` 的解决状态。
2. 当返回一个新的 `Promise` 时，这个新的 `Promise` 决定下一次 `then` 调用的参数。
3. 当返回其他类型时，会直接作为 `Promise` 的 `resolve()` 参数。

### 5.4 `catch()`

`catch()` 是 ECMAScript 新增的方法，用来捕获 `Promise` 的拒绝状态，它并不是 A+ 规范中的一部分。它只接受一个 `rejected` 状态的 `Promise`。

```javascript
const promise = new Promise((resolve, reject) => {
    reject("哈哈哈哈哈哈");
});

promise.then(undefined, err => {
    console.log(err); // "哈哈哈哈哈哈"
});

promise.catch(err => {
    console.log(err); // "哈哈哈哈哈哈"
});
```

`catch()` 会捕获 `Promise` 链中抛出的任何异常，不管是来自 `then()` 中的同步错误还是异步错误。

```javascript
promise.catch(err => {
    console.log(err);
    throw new Error("这里发生了异常");
}).catch(err => {
    console.log(err.message); // "这里发生了异常"
});
```

### 5.5 `finally()`

`finally()` 无论 `Promise` 对象最终是 `fulfilled` 还是 `rejected` 状态，都会执行。通常用于收尾和清除工作。

```javascript
Promise.resolve("你好, 世界").then(res => {
    console.log(res);
    throw new Error("这里发生了错误");
}).catch(err => {
    console.log(err.message);
}).finally(() => {
    console.log("代码执行完成");
});
```

## 6. `Promise.all()`

### 6.1 作用

`Promise.all()` 方法接收一个由 `Promise` 对象组成的可迭代对象（如数组），并返回一个新的 `Promise`。这个新的 `Promise` 会在所有传入的 `Promise` 都成功解决时成功，并返回一个包含每个 `Promise` 解决值的数组；如果有任何一个 `Promise` 被拒绝，则返回的 `Promise` 立即被拒绝，并且拒绝的原因是第一个被拒绝的 `Promise` 的拒绝原因。

### 6.2 语法

```javascript
Promise.all(iterable);
```

- `iterable`：一个可迭代对象（如数组），其中的每个元素都是 `Promise` 对象。

### 6.3 示例

```javascript
const p1 = Promise.resolve(3);
const p2 = Promise.resolve(4);
const p3 = Promise.resolve(5);

Promise.all([p1, p2, p3])
    .then((values) => {
        console.log(values); // [3, 4, 5]
    })
    .catch((error) => {
        console.error(error);
    });
```

### 6.4 特点

- `Promise.all()` 等待所有的 `Promise` 都解决成功，才会执行 `then()` 中的回调。
- 如果任何一个 `Promise` 被拒绝，`Promise.all()` 会立刻失败并返回第一个错误。

## 7. `Promise.race()`

### 7.1 作用

`Promise.race()` 方法接收一个 `Promise` 可迭代对象，返回一个新的 `Promise`。这个新的 `Promise` 会随着第一个完成的 `Promise` 解决（无论是成功还是失败）。如果有一个 `Promise` 首先解决，它的值会被返回。如果有一个 `Promise` 首先拒绝，它的错误会被返回。

### 7.2 语法

```javascript
Promise.race(iterable);
```

- `iterable`：一个可迭代对象（如数组），其中的每个元素都是 `Promise` 对象。

### 7.3 示例

```javascript
const p1 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'First'));
const p2 = new Promise((resolve, reject) => setTimeout(resolve, 200, 'Second'));

Promise.race([p1, p2])
    .then((value) => {
        console.log(value); // First
    })
    .catch((error) => {
        console.error(error);
    });
```

### 7.4 特点

- `Promise.race()` 返回的 `Promise` 会在第一个 `Promise` 完成时解决（无论是成功还是失败）。
- 如果其中某个 `Promise` 被拒绝，`Promise.race()` 会返回被拒绝的错误。

## 8. `Promise.any()`

### 8.1 作用

`Promise.any()` 方法接收一个 `Promise` 可迭代对象，并返回一个新的 `Promise`。该新的 `Promise` 会在其中至少有一个 `Promise` 成功解决时解决，并返回成功的值。如果所有的 `Promise` 都被拒绝，返回的 `Promise` 会被拒绝，并且拒绝的理由是一个 `AggregateError`，它包含了所有拒绝的原因。

### 8.2 语法

```javascript
Promise.any(iterable);
```

- `iterable`：一个可迭代对象（如数组），其中的每个元素都是 `Promise` 对象。

### 8.3 示例

```javascript
const p1 = Promise.reject('Failed');
const p2 = Promise.resolve('Success');
const p3 = Promise.reject('Another failure');

Promise.any([p1, p2, p3])
    .then((value) => {
        console.log(value); // Success
    })
    .catch((error) => {
        console.error(error); // This won't be reached
    });
```