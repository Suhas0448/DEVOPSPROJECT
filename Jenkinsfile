pipeline {
    agent any

    environment {
        DOCKER = credentials('dockerhub-username')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Suhas0448/DEVOPSPROJECT.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat """
                echo Building Docker image...
                docker build -t jenkins-demo .
                """
            }
        }

        stage('Docker Login & Push') {
            steps {
                bat """
                echo Logging in...
                docker login -u ${DOCKER_USR} -p ${DOCKER_PSW}

                echo Tagging...
                docker tag jenkins-demo ${DOCKER_USR}/jenkins-demo:latest

                echo Pushing...
                docker push ${DOCKER_USR}/jenkins-demo:latest
                """
            }
        }
    }

    post {
        success {
            echo "Build SUCCESS!"
        }
        failure {
            echo "Build FAILED!"
        }
    }
}
