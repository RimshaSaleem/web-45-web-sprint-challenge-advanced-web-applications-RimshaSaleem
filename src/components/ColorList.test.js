import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, fireEvent} from "@testing-library/react";
import ColorList from './ColorList';

const testData= {
    data: [ 
      {color: "aqua", code: {hex: "#f0f8ff"}, id: 3}
    ]
  }

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]} />)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={testData.data} />)

    expect(screen.getByText(/aqua/i)).toBeInTheDocument();
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList colors={testData.data} editing={true} />)

    const button = screen.getByTestId(/cancel_button/i);

    expect(screen.getByTestId(/edit_menu/i)).toBeInTheDocument();

    rerender(<ColorList colors={testData.data} editing={false}/>)

    expect(screen.queryByTestId(/edit_menu/i)).not.toBeInTheDocument(); 
});