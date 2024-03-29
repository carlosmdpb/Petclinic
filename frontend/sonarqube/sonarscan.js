const scanner = require('sonarqube-scanner');
// Replace with your project name key and token and 
// use the command 'node ./sonarqube/sonarscan.js' 
// on the frontend folder to analyze
scanner(
    {
        serverUrl: 'https://oitilo.us.es/sonar',
        token: "2a3ab7c19c2775c9777dd74bb3d3ef7a2de06581",
        options: {
            'sonar.projectName': 'PSG2-2324-G5-54-frontend',
            'sonar.projectDescription': 'Here I can add a description of my project',
            'sonar.projectKey': 'PSG2-2324-G5-54-frontend',
            'sonar.projectVersion': '0.0.1',
            'sonar.login': '2a3ab7c19c2775c9777dd74bb3d3ef7a2de06581',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)