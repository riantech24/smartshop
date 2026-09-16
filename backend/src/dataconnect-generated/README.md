# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetNote*](#getnote)
  - [*ListMyNotes*](#listmynotes)
  - [*GetTag*](#gettag)
  - [*ListTags*](#listtags)
  - [*GetWorkspace*](#getworkspace)
  - [*ListMyWorkspaces*](#listmyworkspaces)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateNote*](#createnote)
  - [*UpdateNote*](#updatenote)
  - [*DeleteNote*](#deletenote)
  - [*CreateTag*](#createtag)
  - [*DeleteTag*](#deletetag)
  - [*UpdateTag*](#updatetag)
  - [*CreateWorkspace*](#createworkspace)
  - [*UpdateWorkspace*](#updateworkspace)
  - [*DeleteWorkspace*](#deleteworkspace)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    id: UUIDString;
    email: string;
    displayName: string;
    avatarUrl?: string | null;
    bio?: string | null;
  } & User_Key;
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
  } & User_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetNote
You can execute the `GetNote` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getNote(vars: GetNoteVariables, options?: ExecuteQueryOptions): QueryPromise<GetNoteData, GetNoteVariables>;

interface GetNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNoteVariables): QueryRef<GetNoteData, GetNoteVariables>;
}
export const getNoteRef: GetNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getNote(dc: DataConnect, vars: GetNoteVariables, options?: ExecuteQueryOptions): QueryPromise<GetNoteData, GetNoteVariables>;

interface GetNoteRef {
  ...
  (dc: DataConnect, vars: GetNoteVariables): QueryRef<GetNoteData, GetNoteVariables>;
}
export const getNoteRef: GetNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getNoteRef:
```typescript
const name = getNoteRef.operationName;
console.log(name);
```

### Variables
The `GetNote` query requires an argument of type `GetNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetNoteVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetNote` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetNoteData {
  note?: {
    title: string;
    content: string;
    createdAt: TimestampString;
    author: {
      id: UUIDString;
    } & User_Key;
  };
}
```
### Using `GetNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getNote, GetNoteVariables } from '@dataconnect/generated';

// The `GetNote` query requires an argument of type `GetNoteVariables`:
const getNoteVars: GetNoteVariables = {
  id: ..., 
};

// Call the `getNote()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getNote(getNoteVars);
// Variables can be defined inline as well.
const { data } = await getNote({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getNote(dataConnect, getNoteVars);

console.log(data.note);

// Or, you can use the `Promise` API.
getNote(getNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note);
});
```

### Using `GetNote`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getNoteRef, GetNoteVariables } from '@dataconnect/generated';

// The `GetNote` query requires an argument of type `GetNoteVariables`:
const getNoteVars: GetNoteVariables = {
  id: ..., 
};

// Call the `getNoteRef()` function to get a reference to the query.
const ref = getNoteRef(getNoteVars);
// Variables can be defined inline as well.
const ref = getNoteRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getNoteRef(dataConnect, getNoteVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.note);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.note);
});
```

## ListMyNotes
You can execute the `ListMyNotes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyNotes(options?: ExecuteQueryOptions): QueryPromise<ListMyNotesData, undefined>;

interface ListMyNotesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyNotesData, undefined>;
}
export const listMyNotesRef: ListMyNotesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyNotes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyNotesData, undefined>;

interface ListMyNotesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyNotesData, undefined>;
}
export const listMyNotesRef: ListMyNotesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyNotesRef:
```typescript
const name = listMyNotesRef.operationName;
console.log(name);
```

### Variables
The `ListMyNotes` query has no variables.
### Return Type
Recall that executing the `ListMyNotes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyNotesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyNotesData {
  notes: ({
    id: UUIDString;
    title: string;
    createdAt: TimestampString;
  } & Note_Key)[];
}
```
### Using `ListMyNotes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyNotes } from '@dataconnect/generated';


// Call the `listMyNotes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyNotes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyNotes(dataConnect);

console.log(data.notes);

// Or, you can use the `Promise` API.
listMyNotes().then((response) => {
  const data = response.data;
  console.log(data.notes);
});
```

### Using `ListMyNotes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyNotesRef } from '@dataconnect/generated';


// Call the `listMyNotesRef()` function to get a reference to the query.
const ref = listMyNotesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyNotesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notes);
});
```

## GetTag
You can execute the `GetTag` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTag(vars: GetTagVariables, options?: ExecuteQueryOptions): QueryPromise<GetTagData, GetTagVariables>;

interface GetTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTagVariables): QueryRef<GetTagData, GetTagVariables>;
}
export const getTagRef: GetTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTag(dc: DataConnect, vars: GetTagVariables, options?: ExecuteQueryOptions): QueryPromise<GetTagData, GetTagVariables>;

interface GetTagRef {
  ...
  (dc: DataConnect, vars: GetTagVariables): QueryRef<GetTagData, GetTagVariables>;
}
export const getTagRef: GetTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTagRef:
```typescript
const name = getTagRef.operationName;
console.log(name);
```

### Variables
The `GetTag` query requires an argument of type `GetTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTagVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTag` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTagData {
  tag?: {
    name: string;
  };
}
```
### Using `GetTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTag, GetTagVariables } from '@dataconnect/generated';

// The `GetTag` query requires an argument of type `GetTagVariables`:
const getTagVars: GetTagVariables = {
  id: ..., 
};

// Call the `getTag()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTag(getTagVars);
// Variables can be defined inline as well.
const { data } = await getTag({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTag(dataConnect, getTagVars);

console.log(data.tag);

// Or, you can use the `Promise` API.
getTag(getTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag);
});
```

### Using `GetTag`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTagRef, GetTagVariables } from '@dataconnect/generated';

// The `GetTag` query requires an argument of type `GetTagVariables`:
const getTagVars: GetTagVariables = {
  id: ..., 
};

// Call the `getTagRef()` function to get a reference to the query.
const ref = getTagRef(getTagVars);
// Variables can be defined inline as well.
const ref = getTagRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTagRef(dataConnect, getTagVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tag);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tag);
});
```

## ListTags
You can execute the `ListTags` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTags(options?: ExecuteQueryOptions): QueryPromise<ListTagsData, undefined>;

interface ListTagsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTagsData, undefined>;
}
export const listTagsRef: ListTagsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTagsData, undefined>;

interface ListTagsRef {
  ...
  (dc: DataConnect): QueryRef<ListTagsData, undefined>;
}
export const listTagsRef: ListTagsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTagsRef:
```typescript
const name = listTagsRef.operationName;
console.log(name);
```

### Variables
The `ListTags` query has no variables.
### Return Type
Recall that executing the `ListTags` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTagsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTagsData {
  tags: ({
    id: UUIDString;
    name: string;
  } & Tag_Key)[];
}
```
### Using `ListTags`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTags } from '@dataconnect/generated';


// Call the `listTags()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTags();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTags(dataConnect);

console.log(data.tags);

// Or, you can use the `Promise` API.
listTags().then((response) => {
  const data = response.data;
  console.log(data.tags);
});
```

### Using `ListTags`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTagsRef } from '@dataconnect/generated';


// Call the `listTagsRef()` function to get a reference to the query.
const ref = listTagsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTagsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tags);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tags);
});
```

## GetWorkspace
You can execute the `GetWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getWorkspace(vars: GetWorkspaceVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkspaceData, GetWorkspaceVariables>;

interface GetWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkspaceVariables): QueryRef<GetWorkspaceData, GetWorkspaceVariables>;
}
export const getWorkspaceRef: GetWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWorkspace(dc: DataConnect, vars: GetWorkspaceVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkspaceData, GetWorkspaceVariables>;

interface GetWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetWorkspaceVariables): QueryRef<GetWorkspaceData, GetWorkspaceVariables>;
}
export const getWorkspaceRef: GetWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWorkspaceRef:
```typescript
const name = getWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetWorkspace` query requires an argument of type `GetWorkspaceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetWorkspaceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWorkspaceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetWorkspaceData {
  workspace?: {
    name: string;
    owner: {
      id: UUIDString;
    } & User_Key;
  };
}
```
### Using `GetWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWorkspace, GetWorkspaceVariables } from '@dataconnect/generated';

// The `GetWorkspace` query requires an argument of type `GetWorkspaceVariables`:
const getWorkspaceVars: GetWorkspaceVariables = {
  id: ..., 
};

// Call the `getWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWorkspace(getWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getWorkspace({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWorkspace(dataConnect, getWorkspaceVars);

console.log(data.workspace);

// Or, you can use the `Promise` API.
getWorkspace(getWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.workspace);
});
```

### Using `GetWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWorkspaceRef, GetWorkspaceVariables } from '@dataconnect/generated';

// The `GetWorkspace` query requires an argument of type `GetWorkspaceVariables`:
const getWorkspaceVars: GetWorkspaceVariables = {
  id: ..., 
};

// Call the `getWorkspaceRef()` function to get a reference to the query.
const ref = getWorkspaceRef(getWorkspaceVars);
// Variables can be defined inline as well.
const ref = getWorkspaceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWorkspaceRef(dataConnect, getWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workspace);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workspace);
});
```

## ListMyWorkspaces
You can execute the `ListMyWorkspaces` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyWorkspaces(options?: ExecuteQueryOptions): QueryPromise<ListMyWorkspacesData, undefined>;

interface ListMyWorkspacesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyWorkspacesData, undefined>;
}
export const listMyWorkspacesRef: ListMyWorkspacesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyWorkspaces(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyWorkspacesData, undefined>;

interface ListMyWorkspacesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyWorkspacesData, undefined>;
}
export const listMyWorkspacesRef: ListMyWorkspacesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyWorkspacesRef:
```typescript
const name = listMyWorkspacesRef.operationName;
console.log(name);
```

### Variables
The `ListMyWorkspaces` query has no variables.
### Return Type
Recall that executing the `ListMyWorkspaces` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyWorkspacesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyWorkspacesData {
  workspaces: ({
    id: UUIDString;
    name: string;
  } & Workspace_Key)[];
}
```
### Using `ListMyWorkspaces`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyWorkspaces } from '@dataconnect/generated';


// Call the `listMyWorkspaces()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyWorkspaces();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyWorkspaces(dataConnect);

console.log(data.workspaces);

// Or, you can use the `Promise` API.
listMyWorkspaces().then((response) => {
  const data = response.data;
  console.log(data.workspaces);
});
```

### Using `ListMyWorkspaces`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyWorkspacesRef } from '@dataconnect/generated';


// Call the `listMyWorkspacesRef()` function to get a reference to the query.
const ref = listMyWorkspacesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyWorkspacesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workspaces);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workspaces);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  displayName: string;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., 
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ displayName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., 
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ displayName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateNote
You can execute the `CreateNote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNote(vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;

interface CreateNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
}
export const createNoteRef: CreateNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNote(dc: DataConnect, vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;

interface CreateNoteRef {
  ...
  (dc: DataConnect, vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
}
export const createNoteRef: CreateNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNoteRef:
```typescript
const name = createNoteRef.operationName;
console.log(name);
```

### Variables
The `CreateNote` mutation requires an argument of type `CreateNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNoteVariables {
  title: string;
  content: string;
}
```
### Return Type
Recall that executing the `CreateNote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNoteData {
  note_insert: Note_Key;
}
```
### Using `CreateNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNote, CreateNoteVariables } from '@dataconnect/generated';

// The `CreateNote` mutation requires an argument of type `CreateNoteVariables`:
const createNoteVars: CreateNoteVariables = {
  title: ..., 
  content: ..., 
};

// Call the `createNote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNote(createNoteVars);
// Variables can be defined inline as well.
const { data } = await createNote({ title: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNote(dataConnect, createNoteVars);

console.log(data.note_insert);

// Or, you can use the `Promise` API.
createNote(createNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note_insert);
});
```

### Using `CreateNote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNoteRef, CreateNoteVariables } from '@dataconnect/generated';

// The `CreateNote` mutation requires an argument of type `CreateNoteVariables`:
const createNoteVars: CreateNoteVariables = {
  title: ..., 
  content: ..., 
};

// Call the `createNoteRef()` function to get a reference to the mutation.
const ref = createNoteRef(createNoteVars);
// Variables can be defined inline as well.
const ref = createNoteRef({ title: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNoteRef(dataConnect, createNoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.note_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.note_insert);
});
```

## UpdateNote
You can execute the `UpdateNote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateNote(vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;

interface UpdateNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
}
export const updateNoteRef: UpdateNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateNote(dc: DataConnect, vars: UpdateNoteVariables): MutationPromise<UpdateNoteData, UpdateNoteVariables>;

interface UpdateNoteRef {
  ...
  (dc: DataConnect, vars: UpdateNoteVariables): MutationRef<UpdateNoteData, UpdateNoteVariables>;
}
export const updateNoteRef: UpdateNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateNoteRef:
```typescript
const name = updateNoteRef.operationName;
console.log(name);
```

### Variables
The `UpdateNote` mutation requires an argument of type `UpdateNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateNoteVariables {
  id: UUIDString;
  title: string;
}
```
### Return Type
Recall that executing the `UpdateNote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateNoteData {
  note_update?: Note_Key | null;
}
```
### Using `UpdateNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateNote, UpdateNoteVariables } from '@dataconnect/generated';

// The `UpdateNote` mutation requires an argument of type `UpdateNoteVariables`:
const updateNoteVars: UpdateNoteVariables = {
  id: ..., 
  title: ..., 
};

// Call the `updateNote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateNote(updateNoteVars);
// Variables can be defined inline as well.
const { data } = await updateNote({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateNote(dataConnect, updateNoteVars);

console.log(data.note_update);

// Or, you can use the `Promise` API.
updateNote(updateNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note_update);
});
```

### Using `UpdateNote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateNoteRef, UpdateNoteVariables } from '@dataconnect/generated';

// The `UpdateNote` mutation requires an argument of type `UpdateNoteVariables`:
const updateNoteVars: UpdateNoteVariables = {
  id: ..., 
  title: ..., 
};

// Call the `updateNoteRef()` function to get a reference to the mutation.
const ref = updateNoteRef(updateNoteVars);
// Variables can be defined inline as well.
const ref = updateNoteRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateNoteRef(dataConnect, updateNoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.note_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.note_update);
});
```

## DeleteNote
You can execute the `DeleteNote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteNote(vars: DeleteNoteVariables): MutationPromise<DeleteNoteData, DeleteNoteVariables>;

interface DeleteNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteNoteVariables): MutationRef<DeleteNoteData, DeleteNoteVariables>;
}
export const deleteNoteRef: DeleteNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteNote(dc: DataConnect, vars: DeleteNoteVariables): MutationPromise<DeleteNoteData, DeleteNoteVariables>;

interface DeleteNoteRef {
  ...
  (dc: DataConnect, vars: DeleteNoteVariables): MutationRef<DeleteNoteData, DeleteNoteVariables>;
}
export const deleteNoteRef: DeleteNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteNoteRef:
```typescript
const name = deleteNoteRef.operationName;
console.log(name);
```

### Variables
The `DeleteNote` mutation requires an argument of type `DeleteNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteNoteVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteNote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteNoteData {
  note_delete?: Note_Key | null;
}
```
### Using `DeleteNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteNote, DeleteNoteVariables } from '@dataconnect/generated';

// The `DeleteNote` mutation requires an argument of type `DeleteNoteVariables`:
const deleteNoteVars: DeleteNoteVariables = {
  id: ..., 
};

// Call the `deleteNote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteNote(deleteNoteVars);
// Variables can be defined inline as well.
const { data } = await deleteNote({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteNote(dataConnect, deleteNoteVars);

console.log(data.note_delete);

// Or, you can use the `Promise` API.
deleteNote(deleteNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note_delete);
});
```

### Using `DeleteNote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteNoteRef, DeleteNoteVariables } from '@dataconnect/generated';

// The `DeleteNote` mutation requires an argument of type `DeleteNoteVariables`:
const deleteNoteVars: DeleteNoteVariables = {
  id: ..., 
};

// Call the `deleteNoteRef()` function to get a reference to the mutation.
const ref = deleteNoteRef(deleteNoteVars);
// Variables can be defined inline as well.
const ref = deleteNoteRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteNoteRef(dataConnect, deleteNoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.note_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.note_delete);
});
```

## CreateTag
You can execute the `CreateTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTag(vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

interface CreateTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
}
export const createTagRef: CreateTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTag(dc: DataConnect, vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

interface CreateTagRef {
  ...
  (dc: DataConnect, vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
}
export const createTagRef: CreateTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTagRef:
```typescript
const name = createTagRef.operationName;
console.log(name);
```

### Variables
The `CreateTag` mutation requires an argument of type `CreateTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTagVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTagData {
  tag_insert: Tag_Key;
}
```
### Using `CreateTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTag, CreateTagVariables } from '@dataconnect/generated';

// The `CreateTag` mutation requires an argument of type `CreateTagVariables`:
const createTagVars: CreateTagVariables = {
  name: ..., 
};

// Call the `createTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTag(createTagVars);
// Variables can be defined inline as well.
const { data } = await createTag({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTag(dataConnect, createTagVars);

console.log(data.tag_insert);

// Or, you can use the `Promise` API.
createTag(createTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag_insert);
});
```

### Using `CreateTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTagRef, CreateTagVariables } from '@dataconnect/generated';

// The `CreateTag` mutation requires an argument of type `CreateTagVariables`:
const createTagVars: CreateTagVariables = {
  name: ..., 
};

// Call the `createTagRef()` function to get a reference to the mutation.
const ref = createTagRef(createTagVars);
// Variables can be defined inline as well.
const ref = createTagRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTagRef(dataConnect, createTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tag_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tag_insert);
});
```

## DeleteTag
You can execute the `DeleteTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTag(vars: DeleteTagVariables): MutationPromise<DeleteTagData, DeleteTagVariables>;

interface DeleteTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTagVariables): MutationRef<DeleteTagData, DeleteTagVariables>;
}
export const deleteTagRef: DeleteTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTag(dc: DataConnect, vars: DeleteTagVariables): MutationPromise<DeleteTagData, DeleteTagVariables>;

interface DeleteTagRef {
  ...
  (dc: DataConnect, vars: DeleteTagVariables): MutationRef<DeleteTagData, DeleteTagVariables>;
}
export const deleteTagRef: DeleteTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTagRef:
```typescript
const name = deleteTagRef.operationName;
console.log(name);
```

### Variables
The `DeleteTag` mutation requires an argument of type `DeleteTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTagVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTagData {
  tag_delete?: Tag_Key | null;
}
```
### Using `DeleteTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTag, DeleteTagVariables } from '@dataconnect/generated';

// The `DeleteTag` mutation requires an argument of type `DeleteTagVariables`:
const deleteTagVars: DeleteTagVariables = {
  id: ..., 
};

// Call the `deleteTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTag(deleteTagVars);
// Variables can be defined inline as well.
const { data } = await deleteTag({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTag(dataConnect, deleteTagVars);

console.log(data.tag_delete);

// Or, you can use the `Promise` API.
deleteTag(deleteTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag_delete);
});
```

### Using `DeleteTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTagRef, DeleteTagVariables } from '@dataconnect/generated';

// The `DeleteTag` mutation requires an argument of type `DeleteTagVariables`:
const deleteTagVars: DeleteTagVariables = {
  id: ..., 
};

// Call the `deleteTagRef()` function to get a reference to the mutation.
const ref = deleteTagRef(deleteTagVars);
// Variables can be defined inline as well.
const ref = deleteTagRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTagRef(dataConnect, deleteTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tag_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tag_delete);
});
```

## UpdateTag
You can execute the `UpdateTag` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTag(vars: UpdateTagVariables): MutationPromise<UpdateTagData, UpdateTagVariables>;

interface UpdateTagRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTagVariables): MutationRef<UpdateTagData, UpdateTagVariables>;
}
export const updateTagRef: UpdateTagRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTag(dc: DataConnect, vars: UpdateTagVariables): MutationPromise<UpdateTagData, UpdateTagVariables>;

interface UpdateTagRef {
  ...
  (dc: DataConnect, vars: UpdateTagVariables): MutationRef<UpdateTagData, UpdateTagVariables>;
}
export const updateTagRef: UpdateTagRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTagRef:
```typescript
const name = updateTagRef.operationName;
console.log(name);
```

### Variables
The `UpdateTag` mutation requires an argument of type `UpdateTagVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTagVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateTag` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTagData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTagData {
  tag_update?: Tag_Key | null;
}
```
### Using `UpdateTag`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTag, UpdateTagVariables } from '@dataconnect/generated';

// The `UpdateTag` mutation requires an argument of type `UpdateTagVariables`:
const updateTagVars: UpdateTagVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateTag()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTag(updateTagVars);
// Variables can be defined inline as well.
const { data } = await updateTag({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTag(dataConnect, updateTagVars);

console.log(data.tag_update);

// Or, you can use the `Promise` API.
updateTag(updateTagVars).then((response) => {
  const data = response.data;
  console.log(data.tag_update);
});
```

### Using `UpdateTag`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTagRef, UpdateTagVariables } from '@dataconnect/generated';

// The `UpdateTag` mutation requires an argument of type `UpdateTagVariables`:
const updateTagVars: UpdateTagVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateTagRef()` function to get a reference to the mutation.
const ref = updateTagRef(updateTagVars);
// Variables can be defined inline as well.
const ref = updateTagRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTagRef(dataConnect, updateTagVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tag_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tag_update);
});
```

## CreateWorkspace
You can execute the `CreateWorkspace` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createWorkspace(vars: CreateWorkspaceVariables): MutationPromise<CreateWorkspaceData, CreateWorkspaceVariables>;

interface CreateWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkspaceVariables): MutationRef<CreateWorkspaceData, CreateWorkspaceVariables>;
}
export const createWorkspaceRef: CreateWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createWorkspace(dc: DataConnect, vars: CreateWorkspaceVariables): MutationPromise<CreateWorkspaceData, CreateWorkspaceVariables>;

interface CreateWorkspaceRef {
  ...
  (dc: DataConnect, vars: CreateWorkspaceVariables): MutationRef<CreateWorkspaceData, CreateWorkspaceVariables>;
}
export const createWorkspaceRef: CreateWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createWorkspaceRef:
```typescript
const name = createWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `CreateWorkspace` mutation requires an argument of type `CreateWorkspaceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateWorkspaceVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateWorkspace` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateWorkspaceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateWorkspaceData {
  workspace_insert: Workspace_Key;
}
```
### Using `CreateWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createWorkspace, CreateWorkspaceVariables } from '@dataconnect/generated';

// The `CreateWorkspace` mutation requires an argument of type `CreateWorkspaceVariables`:
const createWorkspaceVars: CreateWorkspaceVariables = {
  name: ..., 
};

// Call the `createWorkspace()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createWorkspace(createWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await createWorkspace({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createWorkspace(dataConnect, createWorkspaceVars);

console.log(data.workspace_insert);

// Or, you can use the `Promise` API.
createWorkspace(createWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.workspace_insert);
});
```

### Using `CreateWorkspace`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createWorkspaceRef, CreateWorkspaceVariables } from '@dataconnect/generated';

// The `CreateWorkspace` mutation requires an argument of type `CreateWorkspaceVariables`:
const createWorkspaceVars: CreateWorkspaceVariables = {
  name: ..., 
};

// Call the `createWorkspaceRef()` function to get a reference to the mutation.
const ref = createWorkspaceRef(createWorkspaceVars);
// Variables can be defined inline as well.
const ref = createWorkspaceRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createWorkspaceRef(dataConnect, createWorkspaceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workspace_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workspace_insert);
});
```

## UpdateWorkspace
You can execute the `UpdateWorkspace` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateWorkspace(vars: UpdateWorkspaceVariables): MutationPromise<UpdateWorkspaceData, UpdateWorkspaceVariables>;

interface UpdateWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkspaceVariables): MutationRef<UpdateWorkspaceData, UpdateWorkspaceVariables>;
}
export const updateWorkspaceRef: UpdateWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateWorkspace(dc: DataConnect, vars: UpdateWorkspaceVariables): MutationPromise<UpdateWorkspaceData, UpdateWorkspaceVariables>;

interface UpdateWorkspaceRef {
  ...
  (dc: DataConnect, vars: UpdateWorkspaceVariables): MutationRef<UpdateWorkspaceData, UpdateWorkspaceVariables>;
}
export const updateWorkspaceRef: UpdateWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateWorkspaceRef:
```typescript
const name = updateWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `UpdateWorkspace` mutation requires an argument of type `UpdateWorkspaceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateWorkspaceVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateWorkspace` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateWorkspaceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateWorkspaceData {
  workspace_update?: Workspace_Key | null;
}
```
### Using `UpdateWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateWorkspace, UpdateWorkspaceVariables } from '@dataconnect/generated';

// The `UpdateWorkspace` mutation requires an argument of type `UpdateWorkspaceVariables`:
const updateWorkspaceVars: UpdateWorkspaceVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateWorkspace()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateWorkspace(updateWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await updateWorkspace({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateWorkspace(dataConnect, updateWorkspaceVars);

console.log(data.workspace_update);

// Or, you can use the `Promise` API.
updateWorkspace(updateWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.workspace_update);
});
```

### Using `UpdateWorkspace`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateWorkspaceRef, UpdateWorkspaceVariables } from '@dataconnect/generated';

// The `UpdateWorkspace` mutation requires an argument of type `UpdateWorkspaceVariables`:
const updateWorkspaceVars: UpdateWorkspaceVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateWorkspaceRef()` function to get a reference to the mutation.
const ref = updateWorkspaceRef(updateWorkspaceVars);
// Variables can be defined inline as well.
const ref = updateWorkspaceRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateWorkspaceRef(dataConnect, updateWorkspaceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workspace_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workspace_update);
});
```

## DeleteWorkspace
You can execute the `DeleteWorkspace` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteWorkspace(vars: DeleteWorkspaceVariables): MutationPromise<DeleteWorkspaceData, DeleteWorkspaceVariables>;

interface DeleteWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkspaceVariables): MutationRef<DeleteWorkspaceData, DeleteWorkspaceVariables>;
}
export const deleteWorkspaceRef: DeleteWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteWorkspace(dc: DataConnect, vars: DeleteWorkspaceVariables): MutationPromise<DeleteWorkspaceData, DeleteWorkspaceVariables>;

interface DeleteWorkspaceRef {
  ...
  (dc: DataConnect, vars: DeleteWorkspaceVariables): MutationRef<DeleteWorkspaceData, DeleteWorkspaceVariables>;
}
export const deleteWorkspaceRef: DeleteWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteWorkspaceRef:
```typescript
const name = deleteWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `DeleteWorkspace` mutation requires an argument of type `DeleteWorkspaceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteWorkspaceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteWorkspace` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteWorkspaceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteWorkspaceData {
  workspace_delete?: Workspace_Key | null;
}
```
### Using `DeleteWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteWorkspace, DeleteWorkspaceVariables } from '@dataconnect/generated';

// The `DeleteWorkspace` mutation requires an argument of type `DeleteWorkspaceVariables`:
const deleteWorkspaceVars: DeleteWorkspaceVariables = {
  id: ..., 
};

// Call the `deleteWorkspace()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteWorkspace(deleteWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await deleteWorkspace({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteWorkspace(dataConnect, deleteWorkspaceVars);

console.log(data.workspace_delete);

// Or, you can use the `Promise` API.
deleteWorkspace(deleteWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.workspace_delete);
});
```

### Using `DeleteWorkspace`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteWorkspaceRef, DeleteWorkspaceVariables } from '@dataconnect/generated';

// The `DeleteWorkspace` mutation requires an argument of type `DeleteWorkspaceVariables`:
const deleteWorkspaceVars: DeleteWorkspaceVariables = {
  id: ..., 
};

// Call the `deleteWorkspaceRef()` function to get a reference to the mutation.
const ref = deleteWorkspaceRef(deleteWorkspaceVars);
// Variables can be defined inline as well.
const ref = deleteWorkspaceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteWorkspaceRef(dataConnect, deleteWorkspaceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workspace_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workspace_delete);
});
```

