pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PSW  = credentials('dockerhub-password')
        DOCKER_IMAGE = "${DOCKERHUB_USER}/jenkins-demo"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Suhas0448/DEVOPSPROJECT.git'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Docker Push') {
            steps {
                sh "echo ${DOCKERHUB_PSW} | docker login -u ${DOCKERHUB_USER} --password-stdin"
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }
    }

    post {
        success {
            emailext(
                to: "example@gmail.com",
                subject: "SUCCESS: Jenkins Build",
                body: "Pipeline executed successfully!"
            )
        }
        failure {
            emailext(
                to: "example@gmail.com",
                subject: "FAILURE: Jenkins Build",
                body: "Pipeline failed!"
            )
        }
    }
}
