// 环境变量测试文件
console.log('测试环境变量:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET);
console.log('AUTH_SECRET:', process.env.AUTH_SECRET);

// 检查环境变量是否在process.env中
console.log('process.env中的所有键:');
console.log(Object.keys(process.env).filter(key =>
  key.includes('GOOGLE') ||
  key.includes('GITHUB') ||
  key.includes('AUTH')
));

export { }; 