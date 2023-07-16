//
//  CardContentView.swift
//  Cards
//
//  Created by Armin on 9/26/22.
//

import SwiftUI

struct CardContentView: View {
    
    @State var frontText: String
    @State var backText : String
    @State var imageURL : String

    let direction: LeftRight?
    @State var deleteAction: () -> Void
    
    @State private var showAnswer: Bool = false
    @State private var showDeleteDialog: Bool = false
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.clear
                    .contentShape(Rectangle()) // This is important
                    .onTapGesture {
                        withAnimation {
                            showAnswer.toggle()
                            #if os(iOS)
                            HapticGenerator.shared.impact()
                            #endif
                        }
                    }

            HStack {
                /// Delete card
                Button(action: { showDeleteDialog.toggle() }) {
                    Image(systemName: "trash.fill")
                }
                
                #if os(iOS)
                .hoverEffect(.lift)
                #endif
                .contentShape(Rectangle())  // This is the line you need to add

                Spacer()
                
                /// Show Answer
                Button(action: {
                    withAnimation {
                        showAnswer.toggle()
                        #if os(iOS)
                        HapticGenerator.shared.impact()
                        #endif
                    }
                }) {
                    Image(systemName: "questionmark.circle.fill")
                }
                #if os(iOS)
                .hoverEffect(.lift)
                #endif
            }
            .opacity(0.65)
            .buttonStyle(.plain)
            .padding()
            
            
            VStack {
                   Text(frontText)
                       .font(.system(.title, design: .rounded))
                       .fontWeight(.medium)
                       .multilineTextAlignment(.center)
                       .padding(.top, 64) // Move the text down by 32 points

                   Spacer() // Pushes the next element (the image) to the bottom
                AsyncImage(url: URL(string: imageURL))
                       .frame(width: 256, height: 256)
                       .padding(.bottom, 32) // Move the image up by 32 points
               }
            
            /// Back Text
            if showAnswer {
                Text(backText)
                    .font(.system(.title3, design: .rounded))
                    .fontWeight(.medium)
                    .multilineTextAlignment(.center)
                    .frame(
                        maxWidth: .infinity,
                        maxHeight: .infinity,
                        alignment: .bottom
                    )
                    .padding()
                    .animation(.interactiveSpring(), value: showAnswer)
                    .transition(.move(edge: .bottom))
            }
            
            /// Thumbs up
            Image(systemName: "hand.thumbsup.circle")
                .font(.largeTitle)
                .imageScale(.large)
                .foregroundColor(.green)
                .symbolRenderingMode(.hierarchical)
                .frame(
                    maxWidth: .infinity,
                    maxHeight: .infinity,
                    alignment: .leading
                )
                .padding()
                .opacity(direction == .right ? 1 : 0)
                .animation(.spring(), value: direction)
                
            /// Thumbs down
            Image(systemName: "hand.thumbsdown.circle")
                .font(.largeTitle)
                .imageScale(.large)
                .foregroundColor(.red)
                .symbolRenderingMode(.hierarchical)
                .frame(
                    maxWidth: .infinity,
                    maxHeight: .infinity,
                    alignment: .trailing
                )
                .padding()
                .opacity(direction == .left ? 1 : 0)
                .animation(.spring(), value: direction)
                
        }
        #if os(macOS)
        .background(
            VisualEffectBlur(
                material: .menu,
                blendingMode: .withinWindow
            )
        ).onTapGesture {
            withAnimation {
                showAnswer.toggle()
                #if os(iOS)
                HapticGenerator.shared.impact()
                #endif
            }
        }
        #elseif os(iOS)
        .background(.ultraThinMaterial)
        #endif
        .cornerRadius(12)
        .shadow(radius: 2)
        .alert("Delete this card?", isPresented: $showDeleteDialog) {
            Button("Delete", role: .destructive, action: deleteAction)
            Button("Cancel", role: .cancel, action: {})
        }
    }
}

struct CardContentView_Previews: PreviewProvider {
    static var previews: some View {
        CardContentView(
            frontText: "Front text with some long text for testing",
            backText: "Back text with some long text for testing",
            imageURL: "",
            direction: nil,
            deleteAction: {}
        )
        .frame(maxWidth: 350, maxHeight: 400)
        .padding(.all, 50)
    }
}
