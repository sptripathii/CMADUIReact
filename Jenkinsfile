pipeline {
    agent any

    tools {
      nodejs 'NodeJS 11.8.0'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'
            }
            }

        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm test'
            }
        }
        stage('Package') {
            steps {
                echo 'Packaging....'
                sh 'npm run package'
                archiveArtifacts artifacts: '**/distribution/*.zip', fingerprint: true
            }
        }
    }
}
