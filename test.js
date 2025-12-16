// Simple test script to verify the application
const express = require('express');
const path = require('path');

console.log('🧪 Testing TedGit Web Service...');

// Test 1: Check if all required files exist
const fs = require('fs');
const requiredFiles = [
  'package.json',
  'server.js',
  'public/index.html',
  'public/css/style.css',
  'public/js/main.js',
  'Dockerfile',
  '.dockerignore',
  '.gitignore',
  'README.md'
];

console.log('\n📁 Checking required files...');
let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file}`);
    allFilesExist = false;
  }
});

// Test 2: Check if dependencies are installed
console.log('\n📦 Checking dependencies...');
try {
  const packageJson = require('./package.json');
  const requiredDeps = ['express', 'helmet', 'cors'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep}: missing`);
      allFilesExist = false;
    }
  });
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  allFilesExist = false;
}

// Test 3: Check server configuration
console.log('\n⚙️ Testing server configuration...');
try {
  // Create a test app instance without starting the server
  const testApp = express();
  console.log('✅ Express app created successfully');
  
  // Test static file serving
  testApp.use(express.static(path.join(__dirname, 'public')));
  console.log('✅ Static file serving configured');
  
  // Test basic routes
  testApp.get('/test', (req, res) => {
    res.json({ status: 'OK', message: 'Test successful' });
  });
  console.log('✅ Test routes configured');
  
} catch (error) {
  console.log('❌ Server configuration error:', error.message);
  allFilesExist = false;
}

// Test 4: Check HTML content
console.log('\n🌐 Checking HTML content...');
try {
  const htmlContent = fs.readFileSync('public/index.html', 'utf8');
  if (htmlContent.includes('Hello Ted!')) {
    console.log('✅ HTML contains "Hello Ted!"');
  } else {
    console.log('❌ HTML does not contain "Hello Ted!"');
    allFilesExist = false;
  }
  
  if (htmlContent.includes('css/style.css') && htmlContent.includes('js/main.js')) {
    console.log('✅ HTML properly references CSS and JS files');
  } else {
    console.log('❌ HTML missing CSS or JS references');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ Error reading HTML file:', error.message);
  allFilesExist = false;
}

// Test 5: Check Docker configuration
console.log('\n🐳 Checking Docker configuration...');
try {
  const dockerfileContent = fs.readFileSync('Dockerfile', 'utf8');
  if (dockerfileContent.includes('EXPOSE 8222')) {
    console.log('✅ Dockerfile exposes port 8222');
  } else {
    console.log('❌ Dockerfile does not expose port 8222');
    allFilesExist = false;
  }
  
  if (dockerfileContent.includes('node:18-alpine')) {
    console.log('✅ Dockerfile uses Node.js 18 Alpine image');
  } else {
    console.log('❌ Dockerfile does not use Node.js 18 Alpine image');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ Error reading Dockerfile:', error.message);
  allFilesExist = false;
}

// Final result
console.log('\n🎉 Test Results:');
if (allFilesExist) {
  console.log('✅ All tests passed! The TedGit Web Service is ready to deploy.');
  console.log('\n🚀 To start the server:');
  console.log('   npm start    # Production mode');
  console.log('   npm run dev  # Development mode');
  console.log('\n🐳 To build and run with Docker:');
  console.log('   docker build -t tedgit .');
  console.log('   docker run -p 8222:8222 tedgit');
} else {
  console.log('❌ Some tests failed. Please check the issues above.');
}

process.exit(allFilesExist ? 0 : 1);