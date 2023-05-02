const AWS = require('aws-sdk')

const uploadToS3 =(data,filename)=>{
    const BUCKET_NAME = 'expensemanagerproject';
    const IAM_USER_KEY = 'AKIAU53ASDRCFANFOJYY';
    const IAM_USER_SECRET = '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';
  
    let s3bucket = new AWS.S3({
      accessKeyId : IAM_USER_KEY,
      secretAccessKey : IAM_USER_SECRET,
      
    })
      const params = {
        Bucket : BUCKET_NAME,
        Key : filename,
        Body : data,
        ACL : 'public-read'
      }
      return new Promise((resolve, reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
          if(err){
            console.log(err, 'something went wrong in bucket upload');
            reject(err)
          }else{
            
            resolve(s3response.Location)
            
          }
        })
      }) 
  }
  module.exports = {uploadToS3}