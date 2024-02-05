// ErrorBoundary.js

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Здесь вы можете выполнить логирование ошибки или отправить ее на сервер
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Отображение сообщения об ошибке
      return (
        <div>
          <h1>Что-то пошло не так.</h1>
          {/* Дополнительный контент или ссылки для пользователей */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
