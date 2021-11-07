const express =require("express");
const app = express();
const PORT = 8080;
const employeeData=require("./employeeData.json");
const graphql=require("graphql");
const {GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString, GraphQLList}=graphql;
const {graphqlHTTP}=require("express-graphql");

const EmployeeType=new GraphQLObjectType({
    name:"Employee",
    fields:()=>({
        employee_id:{type:GraphQLString},
        employee_name:{type:GraphQLString},
        designation:{type:GraphQLString},
        salary:{type:GraphQLInt}
    })
})
const RootQuery= new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        getAllEmployee:{
            type:new GraphQLList(EmployeeType),
            args: {id:{type:GraphQLInt}},
            resolve(parent,args){
                //after configuring mongodb put the code for fetching stuff from db here
                return employeeData
            }
        },
        getEmployeeByID:{
            type:EmployeeType,
            args:{id:{type:GraphQLInt}},
            resolve(parent,args){
                return employeeData[0];
            }
        }
        
    }


})
const Mutation=new GraphQLObjectType({
    name:"mutation",
    fields:{
        createEmployee:{
            type:EmployeeType,
            args:{
        employee_id:{type:GraphQLString},
        employee_name:{type:GraphQLString},
        designation:{type:GraphQLString},
        salary:{type:GraphQLInt}

            },
            resolve(parent,args){
                //db add code here
                employeeData.push({employee_id:employeeData.length + 1,employee_name:args.employee_name,designation:args.designation,salary:args.salary})
                return args
            }
        }
    }
})
const schema = new graphql.GraphQLSchema({query:RootQuery,mutation:Mutation},)

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(PORT,()=>{
    console.log("server running");
});